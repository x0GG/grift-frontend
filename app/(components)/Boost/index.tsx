"use client"

import { Button } from "@/components/Button"
import { Coin } from "@/components/Coin"
import { Heading } from "@/components/Heading"
import { Title } from "@/components/Kit"
import { Modal } from "@/components/Modal"
import { TotalCoins } from "@/components/TotalCoins"
import { useGame } from "@/hooks/useGame"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useUserDataStore, UserData } from "@/stores/userData"
import { earnByTapBoost, maxEnergyBoost, basic, HOST } from "@/config/constants"
import api from "@/services/api"
import styles from "./Boost.module.scss"
import { formatBigNumber } from "@/libs/utils"
import Countdown from "@/components/Countdown"
import { Icon } from "@/components/Icon"

type BoostData = {
  cost: bigint
  boost: number
}

type BonusParams = {
  firstActivationTimestamp: number,
  lastActivationTimestamp: number,
  dailyActivations: number
}

interface CardBoostProps {
  title: string
  subtitle: string
  description: (boost: string) => string
  data: BoostData[]
  objKey: string
  illu: React.ReactNode
  max?: boolean
  disabled?: boolean
}

interface CardBonusProps {
  title: string
  description: string
  objKey: string
  illu: React.ReactNode
  disabled?: boolean
}

const getBoosterLevel = (objKey: string, userData: UserData): number => {
  if (!userData) return 0
  switch (objKey) {
    case "maxEnergyBoosterLevel":
      return userData.maxEnergyBoosterLevel
    case "earnByTapBoosterLevel":
      return userData.earnByTapBoosterLevel
    default:
      return 0
  }
}

const getBonusParams = (objKey: string, userData: UserData): BonusParams | null => {
  if (!userData) return null
  switch (objKey) {
    case "fullEnergy":
      return {
        firstActivationTimestamp: userData.firstFullEnergyBonusTimestamp,
        lastActivationTimestamp: userData.lastFullEnergyBonusTimestamp,
        dailyActivations: userData.fullEnergyBonusCount
      }
    default:
      return null
  }
}

const getBasicParam = (objKey: string): number => {
  switch (objKey) {
    case "maxEnergyBoosterLevel":
      return basic.maxEnergy
    case "earnByTapBoosterLevel":
      return basic.earnByTap
    default:
      return 0
  }
}

const CardBoost = ({
  title,
  subtitle,
  description,
  illu,
  data,
  objKey,
  disabled
}: CardBoostProps) => {
  const { balance } = useGame()
  const { userData } = useUserDataStore()
  const [isOpen, setIsOpen] = useState(false)
  const [pending, setPending] = useState(false)

  const coins = balance ?? BigInt(0)
  const boosterLevel = getBoosterLevel(objKey, userData)
  const max = boosterLevel >= data.length - 1
  const nextPrice = data[boosterLevel + 1] ? data[boosterLevel + 1].cost : BigInt(0)
  const nextBoost = data[boosterLevel + 1] ? data[boosterLevel + 1].boost : 0

  const subTitle = max ? 'Max level reached' : `+${nextBoost} ${subtitle}`

  const buyBooster = async () => {
    if (pending) return
    setPending(true)
    switch (objKey) {
      case "maxEnergyBoosterLevel":
        await api.buyMaxEnergyBooster()
        break
      case "earnByTapBoosterLevel":
        await api.buyEarnTapBooster()
        break
      default:
        break
    }
    setPending(false)
    setIsOpen(false)
  }

  const handleOpen = () => {
    if (disabled) return
    setIsOpen(true)
  }

  return (
    <>
      <div className={styles.card} aria-disabled={disabled} onClick={handleOpen}>
        <div className={styles.illu}>
          {illu} <div className={styles.blur}>{illu}</div>
        </div>
        <div className={styles.txt}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle}>
            {subTitle}
            {!max && nextPrice !== BigInt(0) && (
              <>
                <span />
                {formatBigNumber(nextPrice)} <Coin min />
              </>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} className={styles.booster}>
          <Heading
            title={title}
            txt={description(`${nextBoost}`)}
            top={
              <div className={styles.boosterIllu}>
                {illu} <div className={styles.boosterBg}>{illu}</div>
              </div>
            }
          />
          <div className={styles.section}>
            {pending && <Button className={styles.btn} type="secondary" disabled={true}>
              <Icon icon="line-md:loading-twotone-loop" style={{
                "height": "20px",
                "padding": "0"
              }} />
            </Button>}
            {!pending && <>
              {max ? (
                <Button className={styles.btn} type="secondary">
                  {subtitle}
                </Button>
              ) : (
                <>
                  {coins >= nextPrice ? (
                    <Button
                      className={styles.btn}
                      onClick={buyBooster}
                    >
                      Activate for <strong>
                        {nextPrice === BigInt(0) ?
                          "Free"
                          : (
                            <>
                              {formatBigNumber(nextPrice)} <Coin min />
                            </>
                          )}
                      </strong>
                    </Button>
                  ) : (
                    <Button className={styles.btn} type="secondary" disabled={true}>
                      Insufficient funds
                    </Button>
                  )}
                </>
              )}
            </>}
          </div>
        </Modal>
      )}
    </>
  )
}

const CardBonus = ({
  title,
  description,
  illu,
  objKey,
  disabled
}: CardBonusProps) => {
  const { userData } = useUserDataStore()
  const [isOpen, setIsOpen] = useState(false)
  const [pending, setPending] = useState(false)

  const maxDailyActivations = 6;
  const bonusParams = getBonusParams(objKey, userData)
  const maxActivationsReached = bonusParams ? bonusParams.dailyActivations === maxDailyActivations : true
  const nextActivation = bonusParams
    ? maxActivationsReached
      ? (bonusParams?.firstActivationTimestamp + 24 * 60 * 60) * 1000
      : (bonusParams?.lastActivationTimestamp + 60 * 60) * 1000
    : 0
  const isDayPassed = bonusParams ? (bonusParams.firstActivationTimestamp + 24 * 60 * 60) * 1000 <= Date.now() : false
  const isCountdown = nextActivation > Date.now()

  const subTitle = disabled ? 'Soon' : `${isDayPassed ? maxDailyActivations : (maxDailyActivations - (bonusParams?.dailyActivations ?? 0))} / ${maxDailyActivations}`

  const buyBooster = async () => {
    if (pending) return
    setPending(true)
    switch (objKey) {
      case "fullEnergy":
        await api.refillEnergy()
        break
      default:
        break
    }
    setPending(false)
    setIsOpen(false)
  }

  const handleOpen = () => {
    if (disabled) return
    setIsOpen(true)
  }

  return (
    <>
      <div className={styles.card} aria-disabled={disabled} onClick={handleOpen}>
        <div className={styles.illu}>
          {illu} <div className={styles.blur}>{illu}</div>
        </div>
        <div className={styles.txt}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle}>
            {subTitle}
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} className={styles.booster}>
          <Heading
            title={title}
            txt={description}
            top={
              <div className={styles.boosterIllu}>
                {illu} <div className={styles.boosterBg}>{illu}</div>
              </div>
            }
          />
          <div className={styles.section}>
            {pending && <Button className={styles.btn} type="secondary" disabled={true}>
              <Icon icon="line-md:loading-twotone-loop" style={{
                "height": "20px",
                "padding": "0"
              }} />
            </Button>}
            {!pending && <>
              {isCountdown
                ? <Button className={styles.btn} type="secondary" disabled={true} >
                  <Countdown targetTime={nextActivation} />
                </Button>
                : <Button
                  className={styles.btn}
                  onClick={buyBooster}
                >
                  Activate for <strong>Free</strong>
                </Button>
              }
            </>}
          </div>
        </Modal>
      )}
    </>
  )
}

export const Boost = () => {
  const t = useTranslations("Clicker.Bottom")
  const [isOpen, setIsOpen] = useState(false)

  const dailyBoosters: CardBonusProps[] = [
    {
      title: "Turbo",
      description:
        "Multiply tap income by 5 for 20 seconds without using battery.",
      objKey: "turbo",
      disabled: true,
      illu: (
        <img
          src={HOST + "/img/boost.png"}
          width={340}
          height={401}
          alt={t("boost")}
          draggable={false}
        />
      )
    },
    {
      title: "Full Energy",
      description: "Fill your energy to the maximum.",
      objKey: "fullEnergy",
      illu: (
        <img
          src={HOST + "/img/energy.png"}
          width={340}
          height={401}
          alt={t("energy")}
          draggable={false}
        />
      )
    }
  ]

  const boosters: CardBoostProps[] = [
    {
      title: "Energy Limit",
      subtitle: "to max energy",
      description: (maxEnergyBonus: string) => `Your max energy will be increased by ${maxEnergyBonus} with purchase.`,
      data: maxEnergyBoost,
      objKey: "maxEnergyBoosterLevel",
      illu: (
        <img
          src={HOST + "/img/energy.png"}
          width={340}
          height={401}
          alt={t("energy")}
          draggable={false}
        />
      )
    },
    {
      title: "Tap Boost",
      subtitle: "to earn per tap",
      description: (earnByTapBonus: string) => `Your tap income will be increased by ${earnByTapBonus} with purchase.`,
      data: earnByTapBoost,
      objKey: "earnByTapBoosterLevel",
      illu: (
        <img
          src={HOST + "/img/energy.png"}
          width={340}
          height={401}
          alt={t("energy")}
          draggable={false}
        />
      )
    },
  ]

  return (
    <>
      <div className={styles.boost} onClick={() => setIsOpen(true)}>
        <span>{t("boost")}</span>
        <img
          src={HOST + "/img/boost.png"}
          width={340}
          height={401}
          alt={t("boost")}
          draggable={false}
        />
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} className={styles.modal}>
          <div className={styles.modalTop}>
            <Heading
              title="Get a $GRIFT Boooost"
              txt="Your grift points balance:"
              className={styles.heading}
            />
            <TotalCoins />
          </div>
          <div className={styles.section}>
            <Title>Your Daily Boosters:</Title>
            <div className={styles.list}>
              {dailyBoosters.map((booster, index) => (
                <CardBonus key={index} {...booster} />
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <Title>$GRIFT Boosters:</Title>
            <div className={clsx(styles.list, styles.listFull)}>
              {boosters.map((booster, index) => (
                <CardBoost key={index} {...booster} />
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

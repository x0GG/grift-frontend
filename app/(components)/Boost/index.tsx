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
import { HOST } from "@/config/constants"
import { useUserDataStore, UserData } from "@/stores/userData"
import api from "@/services/api"
import styles from "./Boost.module.scss"

type BoostData = {
  cost: number
  boost: number
}

interface CardBoostProps {
  title: string
  subtitle: string
  description: string
  data: BoostData[]
  objKey: string
  illu: React.ReactNode
  max?: boolean
  disabled?: boolean
}

const getBoosterLevel = (objKey: string, userData: UserData): number => {
  if (!userData) return 0
  switch (objKey) {
    case "maxEnergyBoosterLevel":
      return userData.maxEnergyBoosterLevel
    case "earnByTapBoosterLevel":
      return userData.earnByTapBoosterLevel
    case "energyPerSecondBoosterLevel":
      return userData.energyPerSecondBoosterLevel
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
  const nextPrice = data[boosterLevel + 1] ? data[boosterLevel + 1].cost : 0

  const subTitle = subtitle ? subtitle : max ? 'Max level reached' : `Level ${boosterLevel} -> Level ${boosterLevel + 1}`
  
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
      case "energyPerSecondBoosterLevel":
        await api.buyEnergyRegenBooster()
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
            {!max && nextPrice !== 0 && (
              <>
                {nextPrice} <Coin min /> <span />
              </>
            )}
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
                    Activate for{" "}
                    <strong>
                      {nextPrice === 0 ? (
                        "Free"
                      ) : (
                        <>
                          {nextPrice}
                          <Coin min />
                        </>
                      )}
                    </strong>
                  </Button>
                ) : (
                  <Button className={styles.btn} type="secondary">
                    Insufficient funds
                  </Button>
                )}
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}

export const Boost = () => {
  const t = useTranslations("Clicker.Bottom")
  const [isOpen, setIsOpen] = useState(false)

  const dailyBoosters: CardBoostProps[] = [
    {
      title: "Turbo",
      subtitle: "Soon",
      description:
        "Multiply tap income by 5 for 20 seconds without using battery.",
      data: [],
      objKey: "turbo",
      disabled: true,
      illu: (
        <img
          src={`${HOST}/img/boost.png`}
          width={340}
          height={401}
          alt={t("boost")}
          draggable={false}
        />
      )
    },
    {
      title: "Full Energy",
      subtitle: "Soon",
      description: "Fill your energy to the maximum.",
      data: [],
      objKey: "fullEnergy",
      disabled: true,
      illu: (
        <img
          src={`${HOST}/img/energy.png`}
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
      title: "Grifty Shrimp Kick",
      subtitle: "",
      description: "Max energy booster.",
      data: [
        { cost: 0, boost: 0 }, // level 0
        { cost: 100, boost: 500 }, // level 1
        { cost: 200, boost: 1_000 }, // level 2
        { cost: 2_500, boost: 1_000 }, // level 3
        { cost: 10_000, boost: 5_000 }, // level 4
        { cost: 25_000, boost: 10_000 }, // level 5
        { cost: 50_000, boost: 25_000 }, // level 6
        { cost: 100_000, boost: 50_000 }, // level 7
        { cost: 500_000, boost: 100_000 }, // level 8
        { cost: 1_000_000, boost: 500_000 }, // level 9
        { cost: 5_000_000, boost: 1_000_000 } // level 10
      ],
      objKey: "maxEnergyBoosterLevel",
      illu: (
        <img
          src={`${HOST}/img/energy.png`}
          width={340}
          height={401}
          alt={t("energy")}
          draggable={false}
        />
      )
    },
    {
      title: "Grifty Dolphin Kick",
      subtitle: "",
      description: "Earn by tap booster.",
      data: [
        { cost: 0, boost: 0 }, // level 0
        { cost: 50, boost: 1 }, // level 1
        { cost: 100, boost: 2 }, // level 2
        { cost: 1_000, boost: 3 }, // level 3
        { cost: 2_500, boost: 4 }, // level 4
        { cost: 5_000, boost: 5 }, // level 5
        { cost: 10_000, boost: 6 }, // level 6
        { cost: 25_000, boost: 7 }, // level 7
        { cost: 50_000, boost: 8 }, // level 8
        { cost: 75_000, boost: 9 }, // level 9
        { cost: 100_000, boost: 10 } // level 10
      ],
      objKey: "earnByTapBoosterLevel",
      illu: (
        <img
          src={`${HOST}/img/energy.png`}
          width={340}
          height={401}
          alt={t("energy")}
          draggable={false}
        />
      )
    },
    {
      title: "Grifty Whale Kick",
      subtitle: "",
      description:
        "Increase the speed at which energy recharges",
      data: [
        { cost: 0, boost: 0 }, // level 0
        { cost: 100, boost: 1 }, // level 1
        { cost: 200, boost: 2 }, // level 2
        { cost: 2_500, boost: 3 }, // level 3
        { cost: 10_000, boost: 4 }, // level 4
        { cost: 25_000, boost: 5 }, // level 5
        { cost: 100_000, boost: 6 }, // level 6
        { cost: 250_000, boost: 7 }, // level 7
        { cost: 500_000, boost: 8 }, // level 8
        { cost: 1_000_000, boost: 9 }, // level 9
        { cost: 5_000_000, boost: 10 } // level 10
      ],
      objKey: "energyPerSecondBoosterLevel",
      illu: (
        <img
          src={`${HOST}/img/energy.png`}
          width={340}
          height={401}
          alt={t("energy")}
          draggable={false}
        />
      )
    }
  ]

  return (
    <>
      <div className={styles.boost} onClick={() => setIsOpen(true)}>
        <span>{t("boost")}</span>
        <img
          src={`${HOST}/img/boost.png`}
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
                <CardBoost key={index} {...booster} />
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

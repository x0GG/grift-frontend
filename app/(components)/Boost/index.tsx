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
import styles from "./Boost.module.scss"

interface CardBoostProps {
  title: string
  subtitle: string
  description: string
  price: number
  illu: React.ReactNode
  max?: boolean
}

const CardBoost = ({
  title,
  subtitle,
  description,
  price,
  illu,
  max
}: CardBoostProps) => {
  const { coins } = useGame()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={styles.card} onClick={() => setIsOpen(true)}>
        <div className={styles.illu}>
          {illu} <div className={styles.blur}>{illu}</div>
        </div>
        <div className={styles.txt}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle}>
            {!max && price !== 0 && (
              <>
                {price} <Coin min /> <span />
              </>
            )}
            {subtitle}
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
                {coins >= price ? (
                  <Button
                    className={styles.btn}
                    onClick={() => setIsOpen(false)}
                  >
                    Activate for{" "}
                    <strong>
                      {price === 0 ? (
                        "Free"
                      ) : (
                        <>
                          {price}
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
      subtitle: "6 / 6",
      description:
        "Multiply tap income by 5 for 20 seconds without using battery.",
      price: 0,
      illu: (
        <img
          src="/img/boost.png"
          width={340}
          height={401}
          alt={t("boost")}
          draggable={false}
        />
      )
    },
    {
      title: "Full Energy",
      subtitle: "6 / 6",
      description: "Fill your energy to the maximum.",
      price: 0,
      illu: (
        <img
          src="/img/energy.png"
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
      title: "Multi Kick",
      subtitle: "Max level reached",
      description: "Sed quid est quod in hac causa maxime homines admirentur.",
      price: 1000,
      max: true,
      illu: (
        <img
          src="/img/energy.png"
          width={340}
          height={401}
          alt={t("energy")}
          draggable={false}
        />
      )
    },
    {
      title: "Power Limit",
      subtitle: "Max level reached",
      description: "Sed quid est quod in hac causa maxime homines admirentur.",
      price: 1000,
      max: true,
      illu: (
        <img
          src="/img/energy.png"
          width={340}
          height={401}
          alt={t("energy")}
          draggable={false}
        />
      )
    },
    {
      title: "Speed Amplifier",
      subtitle: "2 Level",
      description:
        "Increase the speed at which energy recharges (+1 per second per level)",
      price: 1000,
      illu: (
        <img
          src="/img/energy.png"
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
          src="/img/boost.png"
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
              title="Buy a Boost"
              txt="Your share balance:"
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
            <Title>Boosters:</Title>
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

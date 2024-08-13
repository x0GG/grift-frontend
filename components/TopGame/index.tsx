"use client"

import { Coin } from "@/components/Coin"
import { useGame } from "@/hooks/useGame"
import { formatBigNumber } from "@/libs/utils"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import styles from "./TopGame.module.scss"
import { HOST } from "@/config/constants"

interface CardProps {
  title: string
  coins: string | number
  energy?: boolean
}

const Card = ({ title, coins, energy }: CardProps) => {
  return (
    <div className={styles.card}>
      <span>{title}</span>
      <strong>
        {coins} {energy ? <img src={HOST + "/img/energy.png"} width={25} height={25} alt="Energy" /> : <Coin min />}
      </strong>
    </div>
  )
}

export const TopGame = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { earnPerTap, currentLevel, nextLevel, energyPerSecond, earnPerHour } = useGame()
  const t = useTranslations("Clicker.Top")

  return (
    <div {...props} className={clsx(styles.top, props.className)}>
      <Card title={t("earnByTap")} coins={`+${formatBigNumber(BigInt(earnPerTap ?? 0), true)}`} />
      <Card
        title={t("earnToLvlUp")}
        coins={`${formatBigNumber(BigInt(nextLevel.requiredCoin))}`}
      />
      <Card
        title={t("profitPerHour")}
        coins={`+${formatBigNumber(earnPerHour ?? BigInt(0))}`}
      />
    </div>
  )
}

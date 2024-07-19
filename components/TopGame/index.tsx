"use client"

import { Coin } from "@/components/Coin"
import { useGame } from "@/hooks/useGame"
import { formatBigNumber } from "@/libs/utils"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import styles from "./TopGame.module.scss"

interface CardProps {
  title: string
  coins: string | number
}

const Card = ({ title, coins }: CardProps) => {
  return (
    <div className={styles.card}>
      <span>{title}</span>
      <strong>
        {coins} <Coin min />
      </strong>
    </div>
  )
}

export const TopGame = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { earnByTap, currentLevel } = useGame()
  const t = useTranslations("Clicker.Top")

  return (
    <div {...props} className={clsx(styles.top, props.className)}>
      <Card title={t("earnByTap")} coins={`+${earnByTap}`} />
      <Card
        title={t("earnToLvlUp")}
        coins={`${formatBigNumber(currentLevel.earnToLevelUp)}`}
      />
      <Card
        title={t("profitPerHour")}
        coins={`+${currentLevel.profitByHour}`}
      />
    </div>
  )
}

"use client"

import { Coin } from "@/components/Coin"
import { Icon } from "@/components/Icon"
import { levels } from "@/config/levels"
import { useGame } from "@/hooks/useGame"
import { useTranslations } from "next-intl"
import Link from "next/link"
import styles from "./Progress.module.scss"

export const Progress = () => {
  const t = useTranslations("All")
  const { maxLevel, level, balance, currentLevel, nextLevel } = useGame()
  const coins = balance ? BigInt(balance) : BigInt(0)


  const nextRequiredCoin = nextLevel.requiredCoin
  const progressPercent = maxLevel ? BigInt(100) : (coins * BigInt(100) / BigInt(nextRequiredCoin))

  return (
    <div className={styles.progress}>
      <div className={styles.xp}>
        <div className={styles.xpInfo}>
          <Link href="/tokens">
            {currentLevel.name}
            <Icon icon="ph:caret-right-fill" />
          </Link>
          <div>
            <small>{t("level")}</small> {level} / {levels.length}
          </div>
        </div>
        <Coin level={level ?? 1} />
        <div className={styles.xpBar}>
          <div
            className={styles.xpBarProgress}
            style={{ width: progressPercent + "%" }}
          />
        </div>
        <Coin level={(level ?? 1) + 1} />
        {!maxLevel && (
          <small className={styles.xpCurrent}>
            {coins.toString()} / {nextRequiredCoin}
          </small>
        )}
      </div>
    </div>
  )
}

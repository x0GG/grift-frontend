"use client"

import { Button } from "@/components/Button"
import { Coin } from "@/components/Coin"
import { formatBigNumber } from "@/libs/utils"
import clsx from "clsx"
import { useState } from "react"
import styles from "./CardEarn.module.scss"

export interface CardEarnProps {
  illu?: React.ReactNode
  title: string
  amount: number
  button: string
}

export const CardEarn = ({ illu, title, amount, button }: CardEarnProps) => {
  const [active, setActive] = useState(false)

  const handleActive = () => {
    setActive(true)
  }

  return (
    <div
      className={clsx(styles.card, { [styles.active]: active })}
      onClick={handleActive}
    >
      <div className={styles.illu}>{illu && illu}</div>
      <div className={styles.title}>{title}</div>

      <div className={styles.amount}>
        +{formatBigNumber(amount)} <Coin min />
      </div>
      {active ? (
        <Button className={clsx(styles.button, styles.green)} icon="ph:check" />
      ) : (
        <Button className={styles.button}>{button}</Button>
      )}
    </div>
  )
}

"use client"

import { useGame } from "@/hooks/useGame"
import clsx from "clsx"
import { HTMLAttributes } from "react"
import { Coin } from "../Coin"
import styles from "./TotalCoins.module.scss"

interface TotalCoinsProps extends HTMLAttributes<HTMLDivElement> {}

export const TotalCoins = ({ ...props }: TotalCoinsProps) => {
  const { level, coins } = useGame()

  return (
    <div {...props} className={clsx(styles.total, props.className)}>
      <div>
        <Coin level={level} min />
        {coins}
      </div>
    </div>
  )
}

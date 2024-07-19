"use client"

import { useGame } from "@/hooks/useGame"
import { useLevel } from "@/hooks/useLevel"
import { HTMLAttributes } from "react"

interface CoinProps extends HTMLAttributes<HTMLImageElement> {
  level?: number
  min?: boolean
}

export const Coin = ({ level, min, ...props }: CoinProps) => {
  let { level: currentLevel } = useGame()

  if (level) {
    currentLevel = level
  }

  const info = useLevel(currentLevel)

  return (
    <img
      {...props}
      src={`/img/coins/${info.id}${min ? "_min" : ""}.png`}
      width={min ? 88 : 350}
      height={min ? 88 : 350}
      alt={info.name}
      draggable={false}
    />
  )
}

"use client"

import { Token3D } from "@/components/Token3D"
import { TopGame } from "@/components/TopGame"
import { TotalCoins } from "@/components/TotalCoins"
import { DURATION_FEEDBACK, HOST } from "@/config/constants"
import { useGame } from "@/hooks/useGame"
import { useSettingsStore } from "@/stores/settings"
import { useRef } from "react"
import { toast } from "sonner"
import { Boost } from "../Boost"
import { Energy } from "../Energy"
import { Progress } from "../Progress"
import styles from "./Clicker.module.scss"

const maxTouches = 2

const Game = () => {
  const { vibration, tapAnimation, numberAnimaton } = useSettingsStore()
  const { addCoin, energy, removeEnergy, earnByTap, currentLevel, reset } =
    useGame()
  const feedBackRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<HTMLDivElement>(null)

  const addFeedBack = (n: number, e: React.TouchEvent<HTMLDivElement>) => {
    if (!gameRef.current || !feedBackRef.current) return

    const touches = e.touches.length

    if (touches > maxTouches) return

    const { left, top } = gameRef.current.getBoundingClientRect()
    const x = e.touches[touches - 1].clientX - left
    const y = e.touches[touches - 1].clientY - top

    if (numberAnimaton) {
      const feedBack = document.createElement("div")
      feedBack.style.left = `${x}px`
      feedBack.style.top = `${y}px`
      feedBack.dataset.text = `+${n}`

      feedBack.dataset.creationTime = String(performance.now())

      feedBackRef.current.appendChild(feedBack)

      const checkToRemove = () => {
        const currentTime = performance.now()
        const creationTime = Number(feedBack.dataset.creationTime)
        if (currentTime - creationTime > DURATION_FEEDBACK) {
          feedBackRef.current?.removeChild(feedBack)
        } else {
          requestAnimationFrame(checkToRemove)
        }
      }

      requestAnimationFrame(checkToRemove)
    }
  }

  const handleClickStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (energy >= earnByTap) {
      addFeedBack(earnByTap, e)
      removeEnergy(earnByTap)
      addCoin(earnByTap)
    } else {
      toast.error("Not enough energy")
    }

    if (navigator.vibrate && vibration) {
      navigator.vibrate(100)
    }

    if (tapAnimation) {
      gameRef.current?.classList.add(styles.clicked)
    }
  }

  const handleClickEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0 && tapAnimation) {
      gameRef.current?.classList.remove(styles.clicked)
    }

    // reset()
  }

  return (
    <div
      ref={gameRef}
      className={styles.game}
      onTouchStart={handleClickStart}
      onTouchEnd={handleClickEnd}
      style={
        {
          "--feedback-duration": `${DURATION_FEEDBACK}ms`
        } as React.CSSProperties
      }
    >
      <div className={styles.gameContent}>
        {/* <Token3D
          key={currentLevel.id}
          id={currentLevel.id}
          className={styles.gameCanvas}
        /> */}
        <img
          src={`${HOST}/img/coins/${currentLevel.id}.png`}
          className={styles.gameCanvas}
        />
        <img src={`${HOST}/img/socle.png`} className={styles.socle} loading="lazy" />
      </div>
      <div ref={feedBackRef} className={styles.feedback} />
    </div>
  )
}

const Bottom = () => {
  return (
    <div className={styles.bottom}>
      <Energy />
      <Boost />
    </div>
  )
}

export const Clicker = () => {
  return (
    <div className={styles.clicker}>
      <TopGame className={styles.top} />
      <TotalCoins />
      <Progress />
      <Game />
      <Bottom />
    </div>
  )
}

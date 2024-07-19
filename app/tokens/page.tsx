"use client"

import { Coin } from "@/components/Coin"
import { Heading } from "@/components/Heading"
import { Icon } from "@/components/Icon"
import { Title } from "@/components/Kit"
import { Token3D } from "@/components/Token3D"
import { levels } from "@/config/levels"
import { useGame } from "@/hooks/useGame"
import { useLevel } from "@/hooks/useLevel"
import { useState } from "react"
import styles from "./token.module.scss"

export default function Page() {
  const { level } = useGame()
  const [showLevel, setShowLevel] = useState(level)
  const infoLevel = useLevel(showLevel)

  return (
    <>
      <Heading
        title={infoLevel.name}
        txt={`Level ${showLevel} / ${levels.length}`}
        className={styles.heading}
        top={
          <div className={styles.token}>
            {/* <Token3D id={infoLevel.id} /> */}
            <img
              src={`/img/coins/${infoLevel.id}_min.png`}
              className={styles.gameCanvas}
            />
          </div>
        }
      />
      <Coin key={showLevel} level={showLevel} className={styles.bg} />
      <div className={styles.nav}>
        {showLevel >= 2 && (
          <button
            onClick={() => setShowLevel(showLevel - 1)}
            className={styles.prev}
          >
            <Icon icon="ph:caret-left" />
          </button>
        )}
        {showLevel < 10 && (
          <button
            onClick={() => setShowLevel(showLevel + 1)}
            className={styles.next}
          >
            <Icon icon="ph:caret-right" />
          </button>
        )}
      </div>
      <div className={styles.ladder}>
        <Title>Leaderboard {infoLevel.name}</Title>
      </div>
    </>
  )
}

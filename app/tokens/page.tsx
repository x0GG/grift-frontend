"use client"

import { Coin } from "@/components/Coin"
import { Heading } from "@/components/Heading"
import { Icon } from "@/components/Icon"
import { Title } from "@/components/Kit"
import { levels } from "@/config/levels"
import { useGame } from "@/hooks/useGame"
import { useLevel } from "@/hooks/useLevel"
import { useState, useEffect } from "react"
import { useLeaserboardStore, Leaderboard } from "@/stores/leaderboard"
import { constructName, formatBigNumber } from "@/libs/utils"
import api from "@/services/api"
import styles from "./token.module.scss"
import { HOST } from "@/config/constants"

const CardLeader = (leader: Leaderboard, rank: number) => {
  return (
    <div key={leader.telegramId} className={styles.leader}>
      <div className={styles.rank}>{rank}</div>
      <h3>
        {constructName(leader.firstName, leader.lastName, leader.username)}
      </h3>
      <strong>{formatBigNumber(leader.balance)}</strong>
    </div>
  )
}

export default function Page() {
  const { level } = useGame()
  const [showLevel, setShowLevel] = useState(level ?? 1)
  const [pending, setPending] = useState(false)
  const infoLevel = useLevel(showLevel)
  const { leaders } = useLeaserboardStore()

  useEffect(() => {
    (async () => {
      setPending(true)
      await api.getLeaderboard(showLevel)
      setPending(false)
    })()
  }, [showLevel])


  return (
    <>
      <Heading
        title={infoLevel.name}
        subtitle={`From ${formatBigNumber(infoLevel.requiredCoin)}`}
        txt={`Level ${showLevel} / ${levels.length}`}
        className={styles.heading}
        top={
          <div className={styles.token}>
            <img
              key={infoLevel.id}
              src={`${HOST}/img/coins/${infoLevel.id}.png`}
              alt={infoLevel.id}
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
        <div className={styles.list}>
          {pending && <div className={styles.loader} />}
          {!pending && leaders.map((l, i) => CardLeader(l, i + 1))}
        </div>
      </div>
    </>
  )
}

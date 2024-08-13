"use client"

import { Button } from "@/components/Button"
import { Heading } from "@/components/Heading"
import { Icon } from "@/components/Icon"
import { Modal } from "@/components/Modal"
import { formatBigNumber } from "@/libs/utils"
import clsx from "clsx"
import { useState } from "react"
import { useUserDataStore } from "@/stores/userData"
import api from "@/services/api"
import { DAILY_TASKS, HOST } from "@/config/constants"
import styles from "./Daily.module.scss"
import Countdown from "@/components/Countdown"

const dayInSec = 86400

export const Daily = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const { userData } = useUserDataStore()

  const diff = Date.now() / 1000 - (userData?.lastDailyClaimTimestamp ?? 0)
  const isClaimed = userData ? diff <= dayInSec : true
  const currentDay = userData ? (diff < 2 * dayInSec ? userData.dailyStreak : 0) : 0
  const nextActivationTimestamp = userData ? (userData.lastDailyClaimTimestamp + dayInSec) * 1000 : 0

  const handleClaim = async () => {
    if (pending) return
    setPending(true)
    await api.claimDaily()
    setPending(false)
  }

  return (
    <>
      <div className={styles.daily} onClick={() => setIsOpen(true)}>
        <div>
          <img
            src={HOST + "/img/calendar.png"}
            width={732}
            height={426}
            alt="Calendar"
            className={styles.calendarFirst}
          />
          <img
            src={HOST + "/img/calendar.png"}
            width={732}
            height={426}
            alt="Calendar"
            className={styles.calendar}
          />
        </div>
        <div className={styles.left}>
          <small>Daily</small> <strong>Reward</strong>
        </div>
        <Icon icon="ph:arrow-right" className={styles.arrow} />
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} className={styles.modal} full>
          <Heading
            title="Daily Reward"
            txt="Accrue coins for logging into the game daily without skipping."
            top={
              <img
                src={HOST + "/img/calendar.png"}
                width={732}
                height={426}
                alt="Calendar"
                className={styles.calendarHeading}
              />
            }
          />
          <ul className={styles.dates}>
            {DAILY_TASKS.map(({ reward }, i) => (
              <li
                key={i}
                className={clsx(styles.date, {
                  [styles.ok]: i === currentDay,
                  [styles.active]: i < currentDay,
                })}
              >
                <span className={styles.day}>Day {i + 1}</span>
                <span className={styles.reward}>{formatBigNumber(reward)}</span>
              </li>
            ))}
          </ul>
          {pending && <Button className={styles.button}>
            <Icon icon="line-md:loading-twotone-loop" style={{
              "height": "20px",
              "padding": "0"
            }} />
          </Button>}
          {!pending && <Button
            className={styles.button}
            disabled={isClaimed}
            onClick={handleClaim}
          >{isClaimed ? <Countdown targetTime={nextActivationTimestamp} /> : 'Claim reward'}</Button>}
        </Modal>
      )}
    </>
  )
}

"use client"

import { Button } from "@/components/Button"
import { Heading } from "@/components/Heading"
import { Icon } from "@/components/Icon"
import { Modal } from "@/components/Modal"
import { formatBigNumber } from "@/libs/utils"
import clsx from "clsx"
import { useState } from "react"
import { HOST } from "@/config/constants"
import styles from "./Daily.module.scss"

export const Daily = () => {
  const [isOpen, setIsOpen] = useState(false)

  const dates = [
    {
      reward: 20
    },
    {
      reward: 40
    },
    {
      reward: 100
    },
    {
      reward: 200
    },
    {
      reward: 400
    },
    {
      reward: 800
    },
    {
      reward: 1500
    },
    {
      reward: 3000
    },
    {
      reward: 5000
    },
    {
      reward: 10000
    }
  ]

  return (
    <>
      <div className={styles.daily} onClick={() => setIsOpen(true)}>
        <div>
          <img
            src={`${HOST}/img/calendar.png`}
            width={732}
            height={426}
            alt="Calendar"
            className={styles.calendarFirst}
          />
          <img
            src={`${HOST}/img/calendar.png`}
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
                src={`${HOST}/img/calendar.png`}
                width={732}
                height={426}
                alt="Calendar"
                className={styles.calendarHeading}
              />
            }
          />
          <ul className={styles.dates}>
            {dates.map(({ reward }, i) => (
              <li
                key={i}
                className={clsx(styles.date, {
                  [styles.ok]: i === 0,
                  [styles.active]: i === 1 || i === 2
                })}
              >
                <span className={styles.day}>Day {i + 1}</span>
                <span className={styles.reward}>{formatBigNumber(reward)}</span>
              </li>
            ))}
          </ul>
          <Button className={styles.button}>Claim reward</Button>
        </Modal>
      )}
    </>
  )
}

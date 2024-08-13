"use client"

import { Button } from "@/components/Button"
import { Coin } from "@/components/Coin"
import { Modal } from "@/components/Modal"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { useUserDataStore, UserData } from '@/stores/userData';
import { useLaunchParamsStore } from "@/stores/launchParams"
import { msToSeconds, calcEarnPerSecond, formatBigNumber } from "@/libs/utils"
import { Icon } from "@/components/Icon"
import api from "@/services/api"
import styles from "./ModalWork.module.scss"

const calcEarnedPerPeriod = (userData: UserData): bigint => {
  if (!userData) {
    return BigInt(0);
  }
  const now = msToSeconds(Date.now());
  let diff = now - userData.lastBalanceByMiningUpdateTimestamp;

  if (diff < 0) {
    diff = 0;
  }
  if (diff > 3600 * 3) { // 3 hours
    diff = 3600 * 3;
  }

  const earned = calcEarnPerSecond(userData.earnPerHour) * BigInt(diff);
  return earned;
}

export const ModalWork = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [onceData, setOnceData] = useState<UserData | null>(null)
  const [pending, setPending] = useState(false)
  const [earned, setEarned] = useState<string>("0")
  const t = useTranslations("ModalWork")
  const { userData } = useUserDataStore()
  const { loaded } = useLaunchParamsStore()

  const handleClosing = async () => {
    setPending(true)
    await api.tap(0)
    setPending(false)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!loaded || !userData || userData.earnPerHour === BigInt(0) || onceData) {
      return;
    }
    setOnceData(userData)
    const earnedBigInt = userData ? calcEarnedPerPeriod(userData) : BigInt(0);
    setEarned(formatBigNumber(earnedBigInt, true))
    setIsOpen(true)
  }, [loaded, userData])

  return (
    isOpen && (
      <Modal onClose={handleClosing}>
        <div className={styles.content}>
          <Coin className={styles.coin} />
          <div className={styles.title}>{t("title")}</div>
          <strong className={styles.number}>{earned}</strong>
        </div>
        {!pending && <Button onClick={handleClosing}>{t("button")}</Button>}
        {pending && <Button disabled>
          <Icon icon="line-md:loading-twotone-loop" style={{
            "height": "20px",
            "padding": "0"
          }} />
        </Button>}
      </Modal>
    )
  )
}

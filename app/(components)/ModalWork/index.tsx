"use client"

import { Button } from "@/components/Button"
import { Coin } from "@/components/Coin"
import { Modal } from "@/components/Modal"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import styles from "./ModalWork.module.scss"

export const ModalWork = () => {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations("ModalWork")

  useEffect(() => setIsOpen(true), [])

  return (
    isOpen && (
      <Modal onClose={() => setIsOpen(false)}>
        <div className={styles.content}>
          <Coin className={styles.coin} />
          <div className={styles.title}>{t("title")}</div>
          <strong className={styles.number}>1500</strong>
        </div>
        <Button onClick={() => setIsOpen(false)}>{t("button")}</Button>
      </Modal>
    )
  )
}

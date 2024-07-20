"use client"

import { ExchangeProps, exchanges } from "@/config/exchange"
import { useUserStore } from "@/stores/user"
import clsx from "clsx"
import { useState } from "react"
import { Heading } from "../Heading"
import { Icon } from "../Icon"
import { Modal } from "../Modal"
import styles from "./Exchange.module.scss"
import { HOST } from "@/config/constants"

export const Exchange = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { exchange, setExchange } = useUserStore()

  let exchangeInfo: ExchangeProps = {
    name: "Team",
    logo: <img src={`${HOST}/img/base-token.png`} alt="clicker" />
  }

  if (exchange >= 0) {
    exchangeInfo = exchanges[exchange]
  }

  const handleExchange = (index: number) => {
    setExchange(index)
    setIsOpen(false)
  }

  return (
    <>
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        <div className={styles.logo}>{exchangeInfo.logo}</div>
        <span>{exchangeInfo.name}</span>
        <Icon icon="ph:caret-down-fill" className={styles.caret} />
      </button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} className={styles.modal} full>
          <Heading
            title="Choose a sick meme character"
            txt="Your chosen character will be with you during your grift mission!"
          />
          <ul className={styles.list}>
            {exchanges.map(({ name, logo }, index) => (
              <li
                key={index}
                onClick={() => handleExchange(index)}
                className={clsx(styles.item, {
                  [styles.active]: exchange === index
                })}
              >
                <div className={styles.itemLogo}>{logo}</div>
                <div className={styles.itemName}>{name}</div>
                <Icon
                  icon={exchange === index ? "ph:check" : "ph:caret-right"}
                  className={styles.chevron}
                />
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </>
  )
}

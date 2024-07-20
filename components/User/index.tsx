"use client"

import { useGame } from "@/hooks/useGame"
import { Avatar } from "../Avatar"
import { HOST } from "@/config/constants"
import styles from "./User.module.scss"

export const User = () => {
  const { name, level } = useGame()

  return (
    <div className={styles.left}>
      <Avatar src={`${HOST}/img/coins/bronze.png`} name={name} level={level} />
      <div className={styles.name}>
        {name} <small>($GRIFTer)</small>
      </div>
    </div>
  )
}

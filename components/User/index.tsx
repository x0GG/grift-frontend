"use client"

import { useGame } from "@/hooks/useGame"
import { Avatar } from "../Avatar"
import styles from "./User.module.scss"
import { constructName } from "@/libs/utils"
import { HOST } from "@/config/constants"

export const User = () => {
  const { username, firstName, lastName, level, telegramId, currentLevel } = useGame()

  const name = constructName(firstName, lastName, username)

  return (
    <div className={styles.left}>
      <Avatar telegramId={telegramId ?? ''} level={level ?? 0} />
      {/* <Avatar src={HOST + "/img/profile.png"} level={level ?? 0} /> */}
      <div className={styles.name}>
        {name} <small>({currentLevel.name})</small>
      </div>
    </div>
  )
}

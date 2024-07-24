"use client"

import { useGame } from "@/hooks/useGame"
import { Avatar } from "../Avatar"
import { HOST } from "@/config/constants"
import styles from "./User.module.scss"
import { constructName } from "@/libs/utils"

export const User = () => {
  const { username, firstName, lastName, level } = useGame()

  const name = constructName(firstName, lastName, username)

  return (
    <div className={styles.left}>
      <Avatar src={``} name={name} level={level} />
      <div className={styles.name}>
        {name} <small>(Grifter)</small>
      </div>
    </div>
  )
}

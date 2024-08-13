"use client"

import { Exchange } from "../Exchange"
import { Params } from "../Params"
import { User } from "../User"
import { useInterval } from "usehooks-ts"
import { useUserDataStore } from "@/stores/userData"
import { ENERGY_CHARGE_DELAY,  PROFIT_UPDATE_DELAY} from "@/config/constants"
import { calcEarnPerSecond } from "@/libs/utils"
import styles from "./Header.module.scss"

export const Header = () => {
  const { userData, setEnergy, setBalance } = useUserDataStore()

  useInterval(() => {
    if (userData === null) {
      return
    }
    const newEnergy = userData.energy + BigInt(userData.energyPerSecond);
    setEnergy(newEnergy > userData.maxEnergy ? userData.maxEnergy : newEnergy);
  }, ENERGY_CHARGE_DELAY)

  useInterval(() => {
    if (userData === null) {
      return
    }
    const newBalance = userData.balance + calcEarnPerSecond(userData.earnPerHour)
    setBalance(newBalance)
  }, PROFIT_UPDATE_DELAY)

  return (
    <header className={styles.header}>
      <User />
      <div className={styles.right}>
        <Exchange />
        <Params />
      </div>
    </header>
  )
}

"use client"

import { ENERGY_CHARGE, ENERGY_CHARGE_DELAY } from "@/config/constants"
import { useGame } from "@/hooks/useGame"
import { useTranslations } from "next-intl"
import { useInterval } from "usehooks-ts"
import { HOST } from "@/config/constants"
import styles from "./Energy.module.scss"

export const Energy = () => {
  const t = useTranslations("Clicker.Bottom")
  const { energy, maxEnergy, addEnergy, setEnergy } = useGame()

  useInterval(() => {
    if (energy + ENERGY_CHARGE < maxEnergy) {
      addEnergy(ENERGY_CHARGE)
    } else {
      setEnergy(maxEnergy)
    }
  }, ENERGY_CHARGE_DELAY)

  return (
    <div className={styles.energy}>
      <img
        src={`${HOST}/img/energy.png`}
        width={340}
        height={401}
        alt={t("energy")}
        draggable={false}
      />
      <span>
        {energy} / {maxEnergy}
      </span>
    </div>
  )
}

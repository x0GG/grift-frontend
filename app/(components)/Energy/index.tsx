"use client"

import { HOST } from "@/config/constants"
import { useGame } from "@/hooks/useGame"
import { useTranslations } from "next-intl"
import styles from "./Energy.module.scss"
import { formatBigNumber } from "@/libs/utils"

export const Energy = () => {
  const t = useTranslations("Clicker.Bottom")
  const { energy, maxEnergy } = useGame()

  return (
    <div className={styles.energy}>
      <img
        src={HOST + "/img/energy.png"}
        width={340}
        height={401}
        alt={t("energy")}
        draggable={false}
      />
      <span>
        {formatBigNumber(energy ?? BigInt(0))} / {formatBigNumber(maxEnergy ?? BigInt(0))}
      </span>
    </div>
  )
}

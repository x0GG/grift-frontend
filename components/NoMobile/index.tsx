"use client"

import clsx from "clsx"
import isMobile from "is-mobile"
import { useTranslations } from "next-intl"
import { useCallback, useEffect } from "react"
import { useEventListener } from "usehooks-ts"
import styles from "./NoMobile.module.scss"

export const NoMobile = () => {
  const t = useTranslations("NoMobile")

  const onWindowResize = useCallback(() => {
    const el = document.documentElement

    if (!isMobile()) {
      el.classList.add("no-mobile")
    } else {
      el.classList.remove("no-mobile")
    }
  }, [])

  useEffect(() => onWindowResize(), [onWindowResize])
  useEventListener("resize", onWindowResize)

  return (
    <div className={clsx(styles.layer, "no-mobile-layer")}>
      <div className={styles.title}>{t("title")}</div>
      <p className={styles.txt}>{t("txt")}</p>
    </div>
  )
}

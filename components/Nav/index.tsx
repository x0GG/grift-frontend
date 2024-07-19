"use client"

import { Sprite } from "@/components/Sprite"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Coin } from "../Coin"
import styles from "./Nav.module.scss"

interface NavLinkProps {
  to: string
  title: string
  children: React.ReactNode
}

const NavLink = ({ to, title, children }: NavLinkProps) => {
  const pathname = usePathname()

  return (
    <li className={clsx(styles.item, { [styles.active]: to === pathname })}>
      <Link href={to} className={styles.navLink}>
        <div className={styles.icon}>{children}</div>
        {title}
      </Link>
    </li>
  )
}

export const Nav = () => {
  const t = useTranslations("Navigation")
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <ul>
        <NavLink to="/friends" title={t("friends")}>
          <Sprite id="friends" viewBox="0 0 33 24" />
        </NavLink>
        <NavLink to="/mine" title={t("mine")}>
          <Sprite id="mine" viewBox="0 0 25 25" />
        </NavLink>
        <li
          className={clsx(styles.play, { [styles.active]: "/" === pathname })}
        >
          <Link href="/" title={t("clicker")}>
            <Sprite id="clicker" viewBox="0 0 30 35" />
          </Link>
        </li>
        <NavLink to="/earn" title={t("earn")}>
          <Sprite id="earn" viewBox="0 0 30 24" />
        </NavLink>
        <NavLink to="/airdrop" title={t("airdrop")}>
          <Coin />
        </NavLink>
      </ul>
      <Sprite id="nav-corner" viewBox="0 0 127 33" className={styles.corner} />
    </nav>
  )
}

"use client"

import { Content } from "@/components/Kit"
import { TopGame } from "@/components/TopGame"
import { TotalCoins } from "@/components/TotalCoins"
import { scrollRestoration } from "@/libs/utils"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { CardMine, CardMineProps } from "./(components)/CardMine"
import { HOST } from "@/config/constants"
import styles from "./mine.module.scss"

export default function Page() {
  const t = useTranslations("Mine")
  const [activeTab, setActiveTab] = useState("markets")

  const tabs = [
    {
      id: "markets",
      title: t("markets")
    },
    {
      id: "web3",
      title: t("web3")
    },
    {
      id: "license",
      title: t("license")
    },
    {
      id: "specials",
      title: t("specials")
    }
  ]

  const cards: CardMineProps[] = [
    {
      title: "Task Ex 1",
      illu: `${HOST}/img/mine-1.jpg`,
      level: 1,
      profit: 2000,
      price: 150000
    },
    {
      title: "Task Ex 2",
      illu: `${HOST}/img/mine-2.jpeg`,
      level: 1,
      profit: 20,
      price: 150
    },
    {
      title: "Task Ex 3",
      illu: `${HOST}/img/mine-3.jpg`,
      level: 2,
      profit: 18,
      price: 250
    },
    {
      title: "Defi Tokens",
      illu: "",
      level: 1,
      profit: 20,
      required: "AI Token lvl 5"
    },
    {
      title: "Stable Coins",
      illu: "",
      level: 1,
      profit: 20,
      required: "Staking lvl 8"
    },
    {
      title: "CMC Top 10",
      illu: "",
      level: 1,
      profit: 20,
      required: "Stable Coins lvl 2"
    },
    {
      title: "AI Token",
      illu: "",
      level: 2,
      profit: 18,
      price: 250
    },
    {
      title: "Staking",
      illu: "",
      level: 1,
      profit: 20,
      price: 150
    },
    {
      title: "Gamefi Tokens",
      illu: "",
      level: 1,
      profit: 20,
      price: 150
    },
    {
      title: "Defi Tokens",
      illu: "",
      level: 1,
      profit: 20,
      required: "AI Token lvl 5"
    },
    {
      title: "Stable Coins",
      illu: "",
      level: 1,
      profit: 20,
      required: "Staking lvl 8"
    },
    {
      title: "CMC Top 10",
      illu: "",
      level: 1,
      profit: 20,
      required: "Stable Coins lvl 2"
    }
  ]

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab)
    scrollRestoration()
  }

  return (
    <Content>
      <TotalCoins className={styles.total} />
      <TopGame />
      <div className={styles.coming}>Cumin soon…</div>
      {/* <div className={styles.tab}>
        <div className={styles.tabNav}>
          {tabs.map((tab) => (
            <button
              className={clsx(styles.tabNavItem, {
                [styles.tabNavItemActive]: tab.id === activeTab
              })}
              key={tab.id}
              name={tab.id}
              onClick={() => handleActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        {tabs.map(
          (tab) =>
            tab.id === activeTab && (
              <div key={tab.id} className={styles.tabContent}>
                {cards.map((card, index) => (
                  <CardMine key={index} {...card} />
                ))}
              </div>
            )
        )}
      </div> */}
    </Content>
  )
}

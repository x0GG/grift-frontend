"use client"

import { Content } from "@/components/Kit"
import { TopGame } from "@/components/TopGame"
import { TotalCoins } from "@/components/TotalCoins"
import { scrollRestoration } from "@/libs/utils"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { useState, useEffect, useMemo } from "react"
import { CardMine, CardMineProps } from "./(components)/CardMine"
import api from "@/services/api"
import { useMiningCardsStore } from "@/stores/miningCards"
import styles from "./mine.module.scss"
import { HOST } from "@/config/constants"

type Tab = {
  id: string
  title: string
}

export default function Page() {
  const t = useTranslations("Mine")
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const { cards: cardsData } = useMiningCardsStore()

  useEffect(() => {
    api.getMiningCards();
  }, [])

  const tabs = useMemo(() => {
    return cardsData.reduce((acc: Tab[], card) => {
      if (!acc.find((tab) => tab.id === card.groupTag)) {
        acc.push({
          id: card.groupTag,
          title: card.groupName
        })
      }
      return acc
    }, [])
  }, [cardsData])

  const cards = useMemo(() => {
    return cardsData.filter((card) => card.groupTag === activeTab)
  }, [cardsData, activeTab])

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab)
    scrollRestoration()
  }

  useEffect(() => {
    if (tabs.length > 0 && !activeTab) {
      setActiveTab(tabs[0].id)
    }
  }, [tabs, activeTab])

  return (
    <Content>
      <TotalCoins className={styles.total} />
      <TopGame />
      {tabs.length === 0 && <div className={styles.coming}>Cumin soon…</div>}
      {tabs.length > 0 && <div className={styles.tab}>
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
                  <CardMine key={index} cardData={card} />
                ))}
              </div>
            )
        )}
      </div>}
    </Content>
  )
}

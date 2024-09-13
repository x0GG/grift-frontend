"use client"

import { Button, ButtonGroup } from "@/components/Button"
import { Heading } from "@/components/Heading"
import { Icon } from "@/components/Icon"
import { Content, Title } from "@/components/Kit"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useUserDataStore } from "@/stores/userData"
import { useInvitedStore } from "@/stores/invited"
import api from "@/services/api"
import { constructName, delay, formatBigNumber } from "@/libs/utils"
import { HOST, referralBonus, referralBonusPerLevel } from "@/config/constants"
import { LevelUpBonus } from "./(components)/LevelUpBonus"
import { Coin } from "@/components/Coin"
import { useLevel } from "@/hooks/useLevel"
import styles from "./friends.module.scss"



interface CardSpecialProps {
  title: string
  amount: number
}

const CardSpecial = ({ title, amount }: CardSpecialProps) => {
  return (
    <div className={styles.special}>
      <img src={HOST + "/img/gift.png"} width={732} height={796} alt={title} />
      <div>
        <h3>{title}</h3>
        <span>
          <strong>+{amount}</strong> For you & your fren
        </span>
      </div>
    </div>
  )
}

interface CardReferralProps {
  title: string
  level: number
  profit: number
}

const CardReferral = ({ title, level, profit }: CardReferralProps) => {
  const levelName = useLevel(level).name;

  return (
    <div className={styles.special}>
      <img src={HOST + "/img/hugs.jpeg"} width={732} height={796} alt={title} />
      <div className={styles.referral}>
        <div>
          <h3>{title}</h3>
          <span>{levelName}</span>
        </div>
        <div>
          <h3><Coin min />&nbsp;+{formatBigNumber(BigInt(profit))}</h3>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const t = useTranslations("Friends")
  const [copied, setCopied] = useState(false)
  const [pending, setPending] = useState(false)
  const [showBonuses, setShowBonuses] = useState(false);
  const { userData } = useUserDataStore()
  const { invited, total } = useInvitedStore()

  const inviteLink = userData ? `${process.env.NEXT_PUBLIC_TELEGRAM_APP_URL}?startapp=${userData.referralCode}` : `${process.env.NEXT_PUBLIC_TELEGRAM_APP_URL}`

  const copy = () => {
    if (copied) return
    navigator.clipboard.writeText(inviteLink)
    toast.success(t("copied"))
    setCopied(true)
    setTimeout(() => setCopied(false), 4000)
  }

  const handleRefresh = async () => {
    if (pending) return
    setPending(true)
    await api.invited()
    await delay(500)
    setPending(false)
  }

  useEffect(() => {
    setPending(true)
    api.invited().finally(async () => {
      await delay(500)
      setPending(false)
    })
  }, [])

  return (
    <Content>
      <Heading
        title={t("title")}
        txt={t("txt")}
        top={
          <img
            src={HOST + "/img/gift.png"}
            width={732}
            height={796}
            alt="Gift"
            className={styles.headingGift}
          />
        }
      />
      <ButtonGroup>
        <Button
          className={styles.invite}
          href={`https://t.me/share/url?url=${inviteLink}`}
        >{t("list.invite")}</Button>
        <Button
          className={styles.copy}
          icon={copied ? "ph:check" : "ph:copy-simple"}
          type="secondary"
          onClick={copy}
        />
      </ButtonGroup>
      <CardSpecial title="Invite a fren" amount={referralBonus.regular} />
      <CardSpecial
        title="Invite a fren with telegram premium"
        amount={referralBonus.premium}
      />
      {!showBonuses && <h6 className={styles.bonuses} onClick={() => setShowBonuses(true)}>More bonuses</h6>}
      {showBonuses && <LevelUpBonus />}
      <div className={styles.list}>
        <div className={styles.listTop}>
          <Title className={styles.listTitle}>
            {t("list.title")} <small>({total})</small>
          </Title>
          <Icon icon="ph:arrows-clockwise" className={pending ? styles.rotating : ''} onClick={handleRefresh} />
        </div>
        {invited.map((i, index) => (
          <CardReferral
            key={index}
            title={constructName(i.firstName, i.lastName, i.username)}
            level={i.level}
            profit={i.reward}
          />
        ))}
        {invited.length === 0 && <div className={styles.listNo}>{t("list.no")}</div>}
      </div>
    </Content>
  )
}

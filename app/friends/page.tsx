"use client"

import { Button, ButtonGroup } from "@/components/Button"
import { Heading } from "@/components/Heading"
import { Icon } from "@/components/Icon"
import { Content, Title } from "@/components/Kit"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { HOST } from "@/config/constants"
import { useUserDataStore } from "@/stores/userData"
import { useInvitedStore } from "@/stores/invited"
import api from "@/services/api"
import { constructName } from "@/libs/utils"
import styles from "./friends.module.scss"

const amounts = {
  regular: 5000,
  premium: 10000,
}

interface CardSpecialProps {
  title: string
  amount: number
}

const CardSpecial = ({ title, amount }: CardSpecialProps) => {
  return (
    <div className={styles.special}>
      <img src={`${HOST}/img/gift.png`} width={732} height={796} alt={title} />
      <div>
        <h3>{title}</h3>
        <span>
          <strong>+{amount}</strong> For you & your fren
        </span>
      </div>
    </div>
  )
}

const CardFriend = ({ title, isPremium }: { title: string, isPremium: boolean}) => {
  return (
    <div className={styles.special}>
      <img src={`${HOST}/img/hugs.jpeg`} width={732} height={796} alt={title} />
      <div>
        <h3>{title}</h3>
        <span>
          <strong>+{isPremium ? amounts.premium : amounts.regular }</strong>
        </span>
      </div>
    </div>
  )
}

export default function Page() {
  const t = useTranslations("Friends")
  const [copied, setCopied] = useState(false)
  const { userData } = useUserDataStore()
  const { invited } = useInvitedStore()

  const inviteLink = userData ? `${process.env.NEXT_PUBLIC_TELEGRAM_APP_URL}?startapp=${userData.refferalCode}` : `${process.env.NEXT_PUBLIC_TELEGRAM_APP_URL}`

  const copy = () => {
    if (copied) return
    navigator.clipboard.writeText(inviteLink)
    toast.success(t("copied"))
    setCopied(true)
    setTimeout(() => setCopied(false), 4000)
  }

  useEffect(() => {
    api.invited()
  }, [])

  return (
    <Content>
      <Heading
        title={t("title")}
        txt={t("txt")}
        top={
          <img
            src={`${HOST}/img/gift.png`}
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
      <CardSpecial title="Invite a fren" amount={amounts.regular} />
      <CardSpecial
        title="Invite a fren with Telegram Premium"
        amount={amounts.premium}
      />
      <div className={styles.list}>
        <div className={styles.listTop}>
          <Title className={styles.listTitle}>
            {t("list.title")} <small>({invited.length})</small>
          </Title>
          <Icon icon="ph:arrows-clockwise" onClick={() => api.invited()} />
        </div>
        {invited.map((i, index) => (
          <CardFriend key={index} title={constructName(i.firstName, i.lastName, i.username)} isPremium={i.isPremium} />
        ))}
        {invited.length === 0 && <div className={styles.listNo}>{t("list.no")}</div>}
      </div>
    </Content>
  )
}

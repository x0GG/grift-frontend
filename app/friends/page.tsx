"use client"

import { Button, ButtonGroup } from "@/components/Button"
import { Heading } from "@/components/Heading"
import { Icon } from "@/components/Icon"
import { Content, Title } from "@/components/Kit"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "sonner"
import { HOST } from "@/config/constants"
import styles from "./friends.module.scss"

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
          <strong>+{amount}</strong> For you & your friend
        </span>
      </div>
    </div>
  )
}

export default function Page() {
  const t = useTranslations("Friends")
  const [copied, setCopied] = useState(false)

  const copy = () => {
    if (copied) return
    toast.success(t("copied"))
    setCopied(true)
    setTimeout(() => setCopied(false), 4000)
  }

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
        <Button className={styles.invite}>{t("list.invite")}</Button>
        <Button
          className={styles.copy}
          icon={copied ? "ph:check" : "ph:copy-simple"}
          type="secondary"
          onClick={copy}
        />
      </ButtonGroup>
      <CardSpecial title="Invite a friend" amount={5000} />
      <CardSpecial
        title="Invite a friend with telegram premium"
        amount={5000}
      />
      <div className={styles.list}>
        <div className={styles.listTop}>
          <Title className={styles.listTitle}>
            {t("list.title")} <small>(0)</small>
          </Title>
          <Icon icon="ph:arrows-clockwise" />
        </div>
        <div className={styles.listNo}>{t("list.no")}</div>
      </div>
    </Content>
  )
}

import { Heading } from "@/components/Heading"
import { Icon } from "@/components/Icon"
import { Content, Title } from "@/components/Kit"
import { CardEarn, CardEarnProps } from "./(components)/CardEarn"
import { Daily } from "./(components)/Daily"
import styles from "./earn.module.scss"

export default function Page() {
  const tasks: CardEarnProps[] = [
    {
      illu: <Icon icon="material-symbols:youtube-music" />,
      title: "Some Song",
      amount: 1000,
      button: "Watch"
    },
    {
      illu: <Icon icon="bx:bxl-telegram" />,
      title: "Join Telegram",
      amount: 200,
      button: "Join"
    },
    {
      illu: <Icon icon="ri:twitter-x-line" />,
      title: "Join X",
      amount: 200,
      button: "Check"
    },
    {
      illu: <Icon icon="bx:bxl-youtube" />,
      title: "Subscribe YouTube",
      amount: 200,
      button: "Join"
    },
    {
      illu: <Icon icon="bx:bxl-instagram" />,
      title: "Follow Instagram",
      amount: 200,
      button: "Join"
    },
    {
      illu: <Icon icon="bx:bxl-discord" />,
      title: "Join Discord",
      amount: 200,
      button: "Join"
    },
    {
      illu: <Icon icon="bx:bxl-tiktok" />,
      title: "Follow TikTok",
      amount: 200,
      button: "Join"
    },
    {
      illu: <Icon icon="bx:bxl-reddit" />,
      title: "Join Reddit",
      amount: 200,
      button: "Join"
    }
  ]

  return (
    <Content>
      <Heading title="Earn More Points" txt="Complete tasks to earn points." />
      <Daily />
      <Title>Tasks List</Title>
      <div className={styles.list}>
        {tasks.map((task, index) => (
          <CardEarn key={index} {...task} />
        ))}
      </div>
    </Content>
  )
}

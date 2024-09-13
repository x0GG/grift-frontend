"use client"

import { Button } from "@/components/Button"
import { Coin } from "@/components/Coin"
import { formatBigNumber } from "@/libs/utils"
import clsx from "clsx"
import { useEarnTasksStore, EarnTask, EarnTaskType } from "@/stores/earnTasks"
import { Icon } from "@/components/Icon"
import { useUtils } from '@telegram-apps/sdk-react'
import { useState } from "react"
import api from "@/services/api"
import styles from "./CardEarn.module.scss"

type TaskInfo = {
  illu: React.ReactNode
  title: string
  buttonText: string
}

const taskInfo: Record<EarnTaskType, TaskInfo> = {
  [EarnTaskType.YTMUSIC]: {
    illu: <Icon icon="material-symbols:youtube-music" />,
    title: "Listen a Song",
    buttonText: "Listen"
  },
  [EarnTaskType.TELEGRAM]: {
    illu: <Icon icon="bx:bxl-telegram" />,
    title: "Join Telegram",
    buttonText: "Join"
  },
  [EarnTaskType.X]: {
    illu: <Icon icon="ri:twitter-x-line" />,
    title: "Join X",
    buttonText: "Follow"
  },
  [EarnTaskType.YOUTUBE]: {
    illu: <Icon icon="bx:bxl-youtube" />,
    title: "Subscribe YouTube",
    buttonText: "Subscribe"
  },
  [EarnTaskType.YOUTUBE_WATCH]: {
    illu: <Icon icon="bx:bxl-youtube" />,
    title: "Watch Full Video",
    buttonText: "Watch"
  },
  [EarnTaskType.INSTAGRAM]: {
    illu: <Icon icon="bx:bxl-instagram" />,
    title: "Follow Instagram",
    buttonText: "Follow"
  },
  [EarnTaskType.DISCORD]: {
    illu: <Icon icon="bx:bxl-discord" />,
    title: "Join Discord",
    buttonText: "Join"
  },
  [EarnTaskType.TIKTOK]: {
    illu: <Icon icon="bx:bxl-tiktok" />,
    title: "Follow TikTok",
    buttonText: "Follow"
  },
  [EarnTaskType.REDDIT]: {
    illu: <Icon icon="bx:bxl-reddit" />,
    title: "Join Reddit",
    buttonText: "Join"
  }
}

export type CardEarnProps = {
  task: EarnTask
}

export const CardEarn = ({
  task
}: CardEarnProps) => {
  const { illu, title, buttonText } = taskInfo[task.type];
  const [pending, setPending] = useState(false);
  const { setCompleted, setClaimed } = useEarnTasksStore();
  const utils = useUtils(true);


  const openLink = async () => {
    utils?.openLink(task.link);

    return new Promise((resolve) => {
      setTimeout(() => {
        setCompleted(task.id);
        resolve(true);
      }, 5000);
    });
  }

  const openTelegramLink = async () => {
    utils?.openTelegramLink(task.link);
    await api.claimEarnTask(task.id);
  }

  const handleActive = async () => {
    if (task.isClaimed || pending) {
      if (task.type === EarnTaskType.TELEGRAM) {
        utils?.openTelegramLink(task.link);
      } else {
        utils?.openLink(task.link);
      }
      return;
    }
    setPending(true);

    if (task.type === EarnTaskType.TELEGRAM) {
      await openTelegramLink();
      return;
    }

    if (task.isCompleted) {
      setClaimed(task.id);
      await api.claimEarnTask(task.id);
    } else {
      await openLink();
    }

    setPending(false);
  }

  return (
    <div
      className={clsx(styles.card, { [styles.active]: task.isClaimed })}
      onClick={handleActive}
    >
      <div className={styles.illu}>{illu && illu}</div>
      <div className={styles.title}>{task.title || title}</div>

      <div className={styles.amount}>
        +{formatBigNumber(task.reward)} <Coin min />
      </div>
      {pending && <Button className={styles.button}>
        <Icon icon="line-md:loading-twotone-loop" style={{
          "height": "10px",
          "padding": "0",
          "marginBottom": "1px", marginRight: '0.5px'
        }} />
      </Button>}

      {!pending && <>
        {task.isClaimed ? (
          <>
            <Button className={clsx(styles.button, styles.green)} icon="ph:check">{task.btnText || buttonText}</Button>
          </>
        ) :
          task.isCompleted
            ? <Button className={styles.button}>Check</Button>
            : <Button className={styles.button}>{task.btnText || buttonText}</Button>
        }
      </>}
    </div>
  )
}

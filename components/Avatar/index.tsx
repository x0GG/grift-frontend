import clsx from "clsx"
import { blo } from "blo";
import { Coin } from "../Coin"
import styles from "./Avatar.module.scss"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  telegramId?: string
  level: number
}

export const Avatar = ({ telegramId, level, src, ...props }: AvatarProps) => {
  const address: `0x${string}` = telegramId ? `0x${'0'.repeat(40 - telegramId.length)}${telegramId}` : '0x'
  const resSRC = telegramId ? blo(address) : src

  return (
    <div
      {...props}
      className={clsx(styles.avatar, props.className)}
    >
      {resSRC && <div style={{ backgroundImage: `url(${resSRC})` }} />}
      {level && <Coin level={level} min />}
    </div>
  )
}

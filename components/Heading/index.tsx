import clsx from "clsx"
import styles from "./Heading.module.scss"

interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  txt?: string
  subtitle?: string
  top?: React.ReactNode
  bottom?: React.ReactNode
}

export const Heading = ({
  title,
  txt,
  subtitle,
  top,
  bottom,
  ...props
}: HeadingProps) => {
  return (
    <div {...props} className={clsx(styles.heading, props.className)}>
      {top && top}
      {title && <div className={styles.title}>{title}</div>}
      {subtitle && <p className={styles.txt}>{subtitle}</p>}
      {txt && <p className={styles.txt}>{txt}</p>}
      {bottom && bottom}
    </div>
  )
}

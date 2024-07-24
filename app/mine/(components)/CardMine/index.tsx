import { Button } from "@/components/Button"
import { Coin } from "@/components/Coin"
import { Icon } from "@/components/Icon"
import { Modal } from "@/components/Modal"
import { useGame } from "@/hooks/useGame"
import { useState } from "react"
import { toast } from "sonner"
import styles from "./CardMine.module.scss"

export interface CardMineProps {
  title: string
  illu?: string
  level: number
  profit: number
  price?: number
  required?: string
}

export const CardMine = ({
  title,
  illu,
  level,
  profit,
  price,
  required
}: CardMineProps) => {
  const { balance } = useGame()
  const [isOpen, setIsOpen] = useState(false)
  const coins = balance ? BigInt(balance) : BigInt(0)

  const Illu = (
    <div className={styles.illu}>
      {required ? (
        <div className={styles.lock}>
          <Icon icon="ph:lock-fill" />
        </div>
      ) : (
        <div
          className={styles.bg}
          style={{ backgroundImage: `url(${illu})` }}
        />
      )}
    </div>
  )

  const Title = (
    <div className={styles.title}>
      {title} <span>Profit per hour</span>
      <strong>
        +{profit}
        <Coin min />
      </strong>
    </div>
  )

  const handleModal = () => {
    if (required) {
      toast.error(`Required: ${required}`)
    } else {
      setIsOpen(true)
    }
  }

  return (
    <>
      <div className={styles.card} onClick={handleModal}>
        <div className={styles.top}>
          {Illu}
          {Title}
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>Lvl. {level}</div>
          <div className={styles.right}>
            {required ? (
              <strong className={styles.required}>{required}</strong>
            ) : (
              <>
                <small>Price:</small>
                <strong>{price}</strong>
                <Coin min />
              </>
            )}
          </div>
        </div>
      </div>
      {isOpen && price && (
        <Modal onClose={() => setIsOpen(false)} className={styles.modal}>
          <div className={styles.modalTop}>
            {Illu}
            <div className={styles.right}>{Title}</div>
          </div>
          <div className={styles.modalBottom}>
            {coins >= price ? (
              <Button className={styles.btn}>
                Activate for{" "}
                <strong>
                  {price}
                  <Coin min />
                </strong>
              </Button>
            ) : (
              <Button className={styles.btn} type="secondary">
                Insufficient funds
              </Button>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}

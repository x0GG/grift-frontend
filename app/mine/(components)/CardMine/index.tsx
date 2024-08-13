import { Button } from "@/components/Button"
import { Coin } from "@/components/Coin"
import { Icon } from "@/components/Icon"
import { Modal } from "@/components/Modal"
import { useGame } from "@/hooks/useGame"
import { useState } from "react"
import { toast } from "sonner"
import { MiningCard } from "@/stores/miningCards"
import { formatBigNumber } from "@/libs/utils"
import api from "@/services/api"
import styles from "./CardMine.module.scss"

export interface CardMineProps {
  cardData: MiningCard
}

export const CardMine = ({
  cardData
}: CardMineProps) => {
  const { balance, earnPerHour } = useGame()
  const [isOpen, setIsOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const coins = balance ? BigInt(balance) : BigInt(0)

  const level = cardData.levels[cardData.purchasedLevel];
  const nextLevel = cardData.levels[cardData.purchasedLevel + 1] || null;
  const totalProfit = cardData.levels.reduce((acc, level) => acc + level.earnPerHourBonus, BigInt(0))
  const currentLevelProfit = cardData.levels.slice(0, cardData.purchasedLevel + 1).reduce((acc, level) => acc + level.earnPerHourBonus, BigInt(0))
  const nextLevelProfit = nextLevel ? nextLevel.earnPerHourBonus : BigInt(0)

  const Illu = (
    <div className={styles.illu}>
      {nextLevel && !nextLevel.isAvailable ? (
        <div className={styles.lock}>
          <Icon icon="ph:lock-fill" />
        </div>
      ) : (
        <div
          className={styles.bg}
          style={{ backgroundImage: `url(${cardData.image})` }}
        />
      )}
    </div>
  )

  const Title = (
    <div className={styles.title}>
      {cardData.name} <span>{nextLevel ? "Profit per hour" : "Total profit per hour"}</span>
      {nextLevel && <strong>
        {`+${formatBigNumber(currentLevelProfit)}`}
        <Coin min />
      </strong>}
      {!nextLevel && <strong>
        {`+${formatBigNumber(totalProfit)}`}
        <Coin min />
      </strong>}
    </div>
  )

  const ModalTitle = (
    <div className={styles.title}>
      {cardData.name} <span>{nextLevel ? "Profit per hour" : "Total profit per hour"}</span>
      <strong>
        {`+${formatBigNumber(nextLevelProfit)}`}
        <Coin min />
      </strong>
    </div>
  )

  const handleModal = () => {
    if (nextLevel && !nextLevel.isAvailable) {
      toast.error(`Required: \n${nextLevel.requirements.join("\n")}`)
    } else {
      setIsOpen(true)
    }
  }

  const handleBuy = async () => {
    if (!nextLevel) return
    setPending(true)
    await api.buyMiningCard(cardData.id)
    await api.getMiningCards()
    setPending(false)
    setIsOpen(false)
  }

  return (
    <>
      <div className={styles.card} onClick={handleModal}>
        <div className={styles.top}>
          {Illu}
          {Title}
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>Lvl. {level.level}</div>
          <div className={styles.right}>
            {!nextLevel && <strong className={styles.required}>Max level reached</strong>}
            {nextLevel && <>
              {!nextLevel.isAvailable
                ? nextLevel.requirements.map((require, index) => <strong className={styles.required} key={`req-${index}`}>{require}</strong>)
                : <>
                  <small>Price:</small>
                  <strong>{formatBigNumber(nextLevel.cost)}</strong>
                  <Coin min />
                </>
              }
            </>}
          </div>
        </div>
      </div>
      {isOpen && nextLevel && (
        <Modal onClose={() => setIsOpen(false)} className={styles.modal}>
          <div className={styles.modalTop}>
            {Illu}
            <div className={styles.right}>{ModalTitle}</div>
          </div>
          <div className={styles.modalBottom}>
            {pending && <Button className={styles.btn} disabled={true}>
              <Icon icon="line-md:loading-twotone-loop" style={{
                "height": "20px",
                "padding": "0"
              }} />
            </Button>}
            {!pending && <>
              {coins >= nextLevel.cost ? (
                <Button className={styles.btn} onClick={handleBuy}>
                  Activate for <strong>
                    {formatBigNumber(nextLevel.cost)}
                    <Coin min />
                  </strong>
                </Button>
              ) : (
                <Button className={styles.btn} type="secondary" disabled={true}>
                  Insufficient funds
                </Button>
              )}
            </>}
          </div>
        </Modal>
      )}
    </>
  )
}

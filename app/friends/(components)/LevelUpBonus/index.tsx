"use client"

import { referralBonusPerLevel } from "@/config/constants";
import { levels } from "@/config/levels";
import { Coin } from "@/components/Coin";
import styles from "../../friends.module.scss"


export const LevelUpBonus = () => {

    return (
        <div className={styles.levelUpBonus}>
            <div className={styles.parent}>
                <h6 className={styles.mainHeading}>Bonus for leveling up</h6>
                <div className={styles.child}>
                    <div className={styles.firstChild}>
                        <h6 className={styles.childHeading}>Level</h6>
                        <h6 className={styles.childHeading}>For fren</h6>
                        <h6 className={styles.childHeading}>Premium</h6>
                    </div>
                    {referralBonusPerLevel.map((bonus) => (
                        <div
                            key={bonus.level}
                            className={styles.levels}
                        >
                            <div className={styles.name}>{levels[bonus.level - 1].name}</div>
                            <div className={styles.levelChild}>
                                <Coin min />
                                <div className={styles.reward}>+{bonus.regular}</div>
                            </div>
                            <div className={styles.levelChild}>
                                <Coin min />
                                <div className={styles.reward}>+{bonus.premium}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

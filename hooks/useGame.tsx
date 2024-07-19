import { ENERGY_BASE } from "@/config/constants"
import { levels } from "@/config/levels"
import { useUserStore } from "@/stores/user"
import { useLevel } from "./useLevel"

export const useGame = () => {
  const user = useUserStore()
  const currentLevel = useLevel(user.level)
  const nextLevel = useLevel(user.level + 1)

  const earnByTap = currentLevel.earnByTap
  const maxEnergy = ENERGY_BASE

  const maxLevel = user.level === levels.length ? true : false

  return {
    ...user,
    maxEnergy,
    earnByTap,
    currentLevel,
    nextLevel,
    maxLevel
  }
}

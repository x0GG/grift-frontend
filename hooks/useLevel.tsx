import { levels } from "@/config/levels"
import { Level } from "@/types/Level"

export const useLevel = (level: number): Level => {
  const trueLevel = level - 1
  let info = levels[trueLevel]

  if (trueLevel === levels.length) {
    info = levels[trueLevel - 1]
  }

  return info
}

import { levels } from "@/config/levels"
import { Level } from "@/types/Level"

export const useLevel = (level: number): Level => {
  return levels[level > levels.length ? levels.length - 1 : level - 1]
}

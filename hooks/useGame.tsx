import { useUserDataStore } from "@/stores/userData"
import { useLevel } from "./useLevel"

export const useGame = () => {
  const { userData, setEnergy, setBalance } = useUserDataStore();
  const currentLevel = useLevel(userData ? userData.level : 1);
  const nextLevel = useLevel(userData ? userData.level + 1 : 2);

  const maxLevel = currentLevel.id === nextLevel.id;

  return {
    ...userData,
    currentLevel,
    nextLevel,
    maxLevel,
    setBalance,
    setEnergy,
  }
}

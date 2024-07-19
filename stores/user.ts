import { ENERGY_BASE } from "@/config/constants"
import { levels } from "@/config/levels"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type UserStore = {
  name: string
  exchange: number
  level: number
  totalCoins: number
  coins: number
  energy: number
  setExchange: (exchange: number) => void
  addCoin: (coin: number) => void
  removeCoin: (coin: number) => void
  addEnergy: (energy: number) => void
  removeEnergy: (energy: number) => void
  setEnergy: (energy: number) => void
  reset: () => void
}

export const useUserStore = create<UserStore>(
  // @ts-ignore
  persist(
    (set, get) => ({
      name: "Username",
      level: 1,
      totalCoins: 0,
      coins: 0,
      energy: ENERGY_BASE,
      exchange: -1,
      setExchange: (exchange) => set(() => ({ exchange })),
      addCoin: (coins) => {
        const currentTotalCoins = get().totalCoins
        const currentLevel = get().level
        const nextLevel = levels[currentLevel]
        if (currentLevel !== levels.length) {
          if (currentTotalCoins + coins >= nextLevel.requiredCoin) {
            set((state) => ({ level: state.level + 1 }))
            set(() => ({ totalCoins: 0 }))
          }
        }
        set((state) => ({
          coins: state.coins + coins,
          totalCoins: state.totalCoins + coins
        }))
      },
      removeCoin: (coins) => set((state) => ({ coins: state.coins - coins })),
      addEnergy: (energy) =>
        set((state) => ({
          energy: state.energy + energy
        })),
      removeEnergy: (energy) =>
        set((state) => ({ energy: state.energy - energy })),
      setEnergy: (energy) => set(() => ({ energy })),
      reset: () => {
        set(() => ({ coins: 0, totalCoins: 0, level: 1, energy: ENERGY_BASE }))
      }
    }),
    {
      name: "user"
    }
  )
)

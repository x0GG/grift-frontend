import { Level } from "@/types/Level"

export const levels: Level[] = [
  {
    id: "bronze",
    name: "Tin Foil Hat",
    requiredCoin: 0,
    earnByTap: 1,
    earnToLevelUp: 1000,
    profitByHour: 8
  },
  {
    id: "silver",
    name: "Deep Diver",
    requiredCoin: 500,
    earnByTap: 2,
    earnToLevelUp: 2000,
    profitByHour: 16
  },
  {
    id: "gold",
    name: "Crackpot",
    requiredCoin: 2000,
    earnByTap: 3,
    earnToLevelUp: 3000,
    profitByHour: 24
  },
  {
    id: "platinum",
    name: "Adept of Secrets",
    requiredCoin: 5000,
    earnByTap: 4,
    earnToLevelUp: 4000,
    profitByHour: 32
  },
  {
    id: "diamond",
    name: "55D Chess Player",
    requiredCoin: 10000,
    earnByTap: 5,
    earnToLevelUp: 5000,
    profitByHour: 40
  },
  {
    id: "epic",
    name: "Chilluminati",
    requiredCoin: 20000,
    earnByTap: 6,
    earnToLevelUp: 6000,
    profitByHour: 48
  },
  {
    id: "legendary",
    name: "Metatron",
    requiredCoin: 50000,
    earnByTap: 7,
    earnToLevelUp: 7000,
    profitByHour: 56
  },
  {
    id: "master",
    name: "Reality Haxxor",
    requiredCoin: 100000,
    earnByTap: 8,
    earnToLevelUp: 8000,
    profitByHour: 64
  },
  {
    id: "grandmaster",
    name: "Ascended Master",
    requiredCoin: 200000,
    earnByTap: 9,
    earnToLevelUp: 9000,
    profitByHour: 72
  },
  {
    id: "lord",
    name: "Grift God",
    requiredCoin: 500000,
    earnByTap: 10,
    earnToLevelUp: 10000,
    profitByHour: 80
  }
]

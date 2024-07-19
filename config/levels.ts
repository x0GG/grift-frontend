import { Level } from "@/types/Level"

export const levels: Level[] = [
  {
    id: "bronze",
    name: "Bronze",
    requiredCoin: 0,
    earnByTap: 1,
    earnToLevelUp: 1000,
    profitByHour: 8
  },
  {
    id: "silver",
    name: "Silver",
    requiredCoin: 500,
    earnByTap: 2,
    earnToLevelUp: 2000,
    profitByHour: 16
  },
  {
    id: "gold",
    name: "Gold",
    requiredCoin: 2000,
    earnByTap: 3,
    earnToLevelUp: 3000,
    profitByHour: 24
  },
  {
    id: "platinum",
    name: "Platinum",
    requiredCoin: 5000,
    earnByTap: 4,
    earnToLevelUp: 4000,
    profitByHour: 32
  },
  {
    id: "diamond",
    name: "Diamond",
    requiredCoin: 10000,
    earnByTap: 5,
    earnToLevelUp: 5000,
    profitByHour: 40
  },
  {
    id: "epic",
    name: "Epic",
    requiredCoin: 20000,
    earnByTap: 6,
    earnToLevelUp: 6000,
    profitByHour: 48
  },
  {
    id: "legendary",
    name: "Legendary",
    requiredCoin: 50000,
    earnByTap: 7,
    earnToLevelUp: 7000,
    profitByHour: 56
  },
  {
    id: "master",
    name: "Master",
    requiredCoin: 100000,
    earnByTap: 8,
    earnToLevelUp: 8000,
    profitByHour: 64
  },
  {
    id: "grandmaster",
    name: "Grandmaster",
    requiredCoin: 200000,
    earnByTap: 9,
    earnToLevelUp: 9000,
    profitByHour: 72
  },
  {
    id: "lord",
    name: "Lord",
    requiredCoin: 500000,
    earnByTap: 10,
    earnToLevelUp: 10000,
    profitByHour: 80
  }
]

import { Level } from "@/types/Level"
import { DECIMALS_MULTIPLIER } from "./constants"

export const levels: Level[] = [
  {
    id: "bronze",
    name: "Peepo",
    requiredCoin: BigInt(0) * BigInt(DECIMALS_MULTIPLIER)
  },
  {
    id: "silver",
    name: "Father Garcia",
    requiredCoin: BigInt(1000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "gold",
    name: "Conspira Dog",
    requiredCoin: BigInt(5000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "platinum",
    name: "Dr Stonks",
    requiredCoin: BigInt(10000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "diamond",
    name: "Ayyy Lmao",
    requiredCoin: BigInt(50000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "epic",
    name: "Yuga Rider",
    requiredCoin: BigInt(100000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "legendary",
    name: "Big Fren",
    requiredCoin: BigInt(250000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "master",
    name: "Chadley Dudebro",
    requiredCoin: BigInt(500000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "grandmaster",
    name: "Alex Jones",
    requiredCoin: BigInt(1000000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "lord",
    name: "Conspiracy God",
    requiredCoin: BigInt(10000000) * BigInt(DECIMALS_MULTIPLIER),
  }
]

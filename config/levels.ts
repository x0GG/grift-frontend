import { Level } from "@/types/Level"
import { DECIMALS_MULTIPLIER } from "./constants"

export const levels: Level[] = [
  {
    id: "bronze",
    name: "Tin Foil Hat",
    requiredCoin: BigInt(0) * BigInt(DECIMALS_MULTIPLIER)
  },
  {
    id: "silver",
    name: "Deep Diver",
    requiredCoin: BigInt(200) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "gold",
    name: "Crackpot",
    requiredCoin: BigInt(1000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "platinum",
    name: "Adept of Secrets",
    requiredCoin: BigInt(10000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "diamond",
    name: "55D Chess Player",
    requiredCoin: BigInt(40000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "epic",
    name: "Chilluminati",
    requiredCoin: BigInt(80000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "legendary",
    name: "Metatron",
    requiredCoin: BigInt(400000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "master",
    name: "Reality Haxxor",
    requiredCoin: BigInt(2000000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "grandmaster",
    name: "Ascended Master",
    requiredCoin: BigInt(4000000) * BigInt(DECIMALS_MULTIPLIER),
  },
  {
    id: "lord",
    name: "Grift God",
    requiredCoin: BigInt(40000000) * BigInt(DECIMALS_MULTIPLIER),
  }
]

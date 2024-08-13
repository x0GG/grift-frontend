import { create } from "zustand";

export type MiningCardLevel = {
  level: number;
  cost: bigint;
  earnPerHourBonus: bigint;
  minimalUserLevel: number;
  dependedOnCardId: number;
  dependedOnCardLevel: number;
  minInvitedUsers: number;
  requirements: string[];
  isPurchased: boolean;
  isAvailable: boolean;
}

export type MiningCard = {
  id: number;
  name: string;
  description: string;
  image: string;
  groupTag: string;
  groupName: string;
  purchasedLevel: number;
  levels: MiningCardLevel[];
}

type MiningCardsStore = {
  cards: MiningCard[];
  setCards: (cards: MiningCard[]) => void;
}

export const useMiningCardsStore = create<MiningCardsStore>(
  (set, get) => ({
    cards: [],
    setCards: (cards) => set(() => ({ cards }))
  })
)

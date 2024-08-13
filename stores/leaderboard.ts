import { create } from "zustand";

export type Leaderboard = {
  telegramId: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePicture: string;
  isPremium: boolean;
  balance: bigint;
}

type LeaderboardStore = {
  leaders: Leaderboard[];
  setLeaders: (leaders: Leaderboard[]) => void;
}

export const useLeaserboardStore = create<LeaderboardStore>(
  (set, get) => ({
    leaders: [],
    setLeaders: (leaders: Leaderboard[]) => set({ leaders })
  })
)

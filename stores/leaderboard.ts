import { create } from "zustand";

export type Leaderboart = {
  telegramId: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePicture: string;
  isPremium: boolean;
  balance: bigint;
}

type LeaderboartStore = {
  leaders: Leaderboart[];
  setLeaders: (leaders: Leaderboart[]) => void;
}

export const useLeaserboardStore = create<LeaderboartStore>(
  (set, get) => ({
    leaders: [],
    setLeaders: (leaders: Leaderboart[]) => set({ leaders })
  })
)

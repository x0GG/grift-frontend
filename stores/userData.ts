import { create } from "zustand"

export type UserData = {
  telegramId: string;
  firstName: string;
  lastName: string;
  username: string;
  languageCode: string;
  isPremium: boolean;
  allowsWriteToPm: boolean;
  refferalCode: string;
  profilePicture: string;
  balance: bigint;
  energy: bigint;
  level: number;
  earnByTapBoosterLevel: number;
  energyPerSecondBoosterLevel: number;
  maxEnergyBoosterLevel: number;
  earnPerHourBonus: string;
  lastEnergyUpdateTimestamp: number;
  lastTapTimestamp: number;
  lastDailyClaimTimestamp: number;
  prevDailyClaimTimestamp: number;
  dailyStreak: number;
  lastFullEnergyBonusTimestamp: number;
  fullEnergyBonusCount: number;
  teamId: number;
  earnTaskIds: number[];
  maxEnergy: number;
  energyPerSecond: number;
  earnPerTap: number;
} | null;

type UserDataStore = {
  userData: UserData;
  setUserData: (userData: UserData) => void;
  setUserDataTeamId: (teamId: number) => void;
  setEnergy: (energy: bigint) => void;
  setBalance: (balance: bigint) => void;
}

export const useUserDataStore = create<UserDataStore>(
  (set, get) => ({
    userData: null,
    setUserData: (userData) => set(() => ({ userData })),
    setUserDataTeamId: (teamId) => set((state) => {
      if (state.userData) {
        state.userData.teamId = teamId
        return { userData: state.userData }
      }
      return { userData: null }
    }),
    setEnergy: (energy) => set((state) => {
      if (state.userData) {
        state.userData.energy = energy
        return { userData: state.userData }
      }
      return { userData: null }
    }),
    setBalance: (balance) => set((state) => {
      if (state.userData) {
        state.userData.balance = balance
        return { userData: state.userData }
      }
      return { userData: null }
    }),
  })
)

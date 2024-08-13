import { create } from "zustand";

export type Invited = {
  telegramId: string;
  firstName: string;
  lastName: string;
  username: string;
  isPremium: boolean;
  reward: number;
  level: number;
}

type InvitedStore = {
  invited: Invited[];
  total: number;
  setInvited: (invited: Invited[]) => void;
  setTotal: (total: number) => void;
}

export const useInvitedStore = create<InvitedStore>(
  (set, get) => ({
    invited: [],
    setInvited: (invited: Invited[]) => set({ invited }),
    total: 0,
    setTotal: (total: number) => set({ total })
  })
)

import { create } from "zustand";

export type Invited = {
  telegramId: string;
  firstName: string;
  lastName: string;
  username: string;
  isPremium: boolean;
  reward: number;
}

type InvitedStore = {
  invited: Invited[];
  setInvited: (invited: Invited[]) => void;
}

export const useInvitedStore = create<InvitedStore>(
  (set, get) => ({
    invited: [],
    setInvited: (invited: Invited[]) => set({ invited })
  })
)

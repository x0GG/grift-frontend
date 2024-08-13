import { create } from "zustand";
import { LaunchParams } from '@telegram-apps/sdk-react';

type LaunchParamsStore = {
  launchParams: LaunchParams | null;
  setLaunchParams: (launchParams: LaunchParams) => void;
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

export const useLaunchParamsStore = create<LaunchParamsStore>(
    (set, get) => ({
      launchParams: null,
      setLaunchParams: (launchParams) => set(() => ({ launchParams })),
      loaded: false,
      setLoaded: (loaded) => set(() => ({ loaded })),
    })
)

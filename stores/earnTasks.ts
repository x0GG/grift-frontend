import { create } from "zustand";

export enum EarnTaskType {
  TELEGRAM = 'telegram',
  X = 'x',
  YOUTUBE = 'youtube',
  INSTAGRAM = 'instagram',
  DISCORD = 'discord',
  TIKTOK = 'tiktok',
  REDDIT = 'reddit',
  YTMUSIC = 'ytmusic',
  YOUTUBE_WATCH = 'youtube_watch',
}

export type EarnTask = {
  id: number;
  link: string;
  type: EarnTaskType;
  reward: bigint;
  order: number;
  isCompleted: boolean;
  isClaimed: boolean;
  title: string;
  btnText: string;
}

type EarnTasksStore = {
  tasks: EarnTask[];
  setTasks: (tasks: EarnTask[]) => void;
  setCompleted: (id: number) => void;
  setClaimed: (id: number) => void;
}

export const useEarnTasksStore = create<EarnTasksStore>(
  (set, get) => ({
    tasks: [],
    setTasks: (tasks) => set(() => ({ tasks })),
    setCompleted: (id) => set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: true };
        }
        return task;
      })
    })),
    setClaimed: (id) => set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isClaimed: true };
        }
        return task;
      })
    }))
  })
)

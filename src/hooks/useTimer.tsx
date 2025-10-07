import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RunningTimer } from '@/lib/types';

interface TimerState {
  runningTimer: RunningTimer | null;
  startTimer: (taskId: string, description: string) => void;
  stopTimer: () => { duration: number; timer: RunningTimer } | null;
  isRunning: boolean;
}

export const useTimer = create<TimerState>()(
  persist(
    (set, get) => ({
      runningTimer: null,
      isRunning: false,

      startTimer: (taskId: string, description: string) => {
        set({
          runningTimer: {
            taskId,
            startTime: new Date(),
            description,
          },
          isRunning: true,
        });
      },

      stopTimer: () => {
        const { runningTimer } = get();
        if (!runningTimer) return null;

        const duration = Math.floor((new Date().getTime() - new Date(runningTimer.startTime).getTime()) / (1000 * 60 * 60));
        
        set({ runningTimer: null, isRunning: false });
        
        return { duration, timer: runningTimer };
      },
    }),
    {
      name: 'timer-storage',
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserData, FitnessPlan } from '@/types';

interface FitnessStore {
  fitnessPlan: FitnessPlan | null;
  userData: UserData | null;
  setFitnessPlan: (plan: FitnessPlan) => void;
  setUserData: (data: UserData) => void;
  clearPlan: () => void;

  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;
  initializeDarkMode: () => void;
}

export const useFitnessStore = create<FitnessStore>()(
  persist(
    (set, get) => ({
      fitnessPlan: null,
      userData: null,

      setFitnessPlan: (plan) => set({ fitnessPlan: plan }),
      setUserData: (data) => set({ userData: data }),
      clearPlan: () => set({ fitnessPlan: null, userData: null }),

      // 🔥 THEME LOGIC (FINAL)
      darkMode: false,

      toggleDarkMode: () => {
        const next = !get().darkMode;
        set({ darkMode: next });

        document.documentElement.classList.toggle('dark', next);
      },

      initializeDarkMode: () => {
        if (typeof window === 'undefined') return;

        // 👇 If persist already restored value, just apply it
        const stored = get().darkMode;

        if (stored !== undefined) {
          document.documentElement.classList.toggle('dark', stored);
          return;
        }

        // 👇 First-time user → system preference
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;

        set({ darkMode: prefersDark });
        document.documentElement.classList.toggle('dark', prefersDark);
      },
    }),
    {
      name: 'fitness-store',
      partialize: (state) => ({
        fitnessPlan: state.fitnessPlan,
        userData: state.userData,
        darkMode: state.darkMode,
      }),
    }
  )
);

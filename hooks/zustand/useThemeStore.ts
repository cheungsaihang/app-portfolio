import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  setTheme: (_theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (_theme) => set(() => ({ theme: _theme })),
    }),{
      name:'theme',
      storage: createJSONStorage(() =>  AsyncStorage),
    }
  ));
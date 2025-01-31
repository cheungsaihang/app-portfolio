import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  sid: string | null;
  rsid: string | null;
  setAccessToken: (_sid: string | null) => void;
  setRefreshToken: (_rsid: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      sid: null,
      rsid: null,
      setAccessToken: (_sid) => set(() => ({ sid: _sid })),
      setRefreshToken: (_rsid) => set(() => ({ rsid: _rsid })),
    }),{
      name:'auth',
      storage: createJSONStorage(() =>  AsyncStorage),
    }
  ));
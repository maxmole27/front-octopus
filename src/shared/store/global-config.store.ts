import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type GlobalConfigProps = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  globalLoading: boolean
  setGlobalLoading: (loading: boolean) => void
}

export const useGlobalConfigStore = create(
  persist<GlobalConfigProps>(
    (set) => ({
      theme: 'light',
      setTheme: (theme: 'light' | 'dark') => set({ theme }),
      globalLoading: false,
      setGlobalLoading: (loading: boolean) => set({ globalLoading: loading }),
    }),
    {
      name: 'global-config',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

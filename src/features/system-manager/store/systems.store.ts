import { create } from 'zustand'

interface SystemsStore {
  search_query: string
  setSearchQuery: (query: string) => void
}

export const useSystemsStore = create<SystemsStore>((set) => ({
  search_query: '',
  setSearchQuery: (query: string) => set({ search_query: query }),
}))

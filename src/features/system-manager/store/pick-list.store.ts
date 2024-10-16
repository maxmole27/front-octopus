import { create } from 'zustand'

interface PickListStore {
  filterRangeStartDate: Date | null
  setFilterRangeStartDate: (date: Date | null) => void
  filterRangeEndDate: Date | null
  setFilterRangeEndDate: (date: Date | null) => void
  filterSports: string[]
  setFilterSports: (sports: string[]) => void
  filterTeamsOrPlayers: string
  setFilterTeamsOrPlayers: (teamsOrPlayers: string) => void
}

export const usePickListStore = create<PickListStore>((set) => ({
  filterRangeStartDate: null,
  setFilterRangeStartDate: (date) => set({ filterRangeStartDate: date }),
  filterRangeEndDate: null,
  setFilterRangeEndDate: (date) => set({ filterRangeEndDate: date }),
  filterSports: [],
  setFilterSports: (sports) => set({ filterSports: sports }),
  filterTeamsOrPlayers: '',
  setFilterTeamsOrPlayers: (teamsOrPlayers) => set({ filterTeamsOrPlayers: teamsOrPlayers })
}))

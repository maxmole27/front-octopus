import { create } from 'zustand'

interface SelectedSystemData {
  systemName: string;
  systemId: string;
  systemImageUrl: string;
}

interface PickManagerStore {
  selectedSystem: SelectedSystemData | null;
  setSelectedSystem: (selectedSystem: SelectedSystemData) => void;
}

export const pickManagerStore = create<PickManagerStore>((set) => ({
  selectedSystem: null,
  setSelectedSystem: (system) => set({ selectedSystem: system })
}))

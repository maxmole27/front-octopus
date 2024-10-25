import { create } from 'zustand'

// interface SelectedSystemData {
//   systemName: string;
//   systemId: string;
//   systemImageUrl: string;
// }

interface PickManagerStore {
  editCounter: number;
  incrementEditCounter: () => void;
}

export const pickManagerStore = create<PickManagerStore>((set) => ({
  editCounter: 0,
  incrementEditCounter: () => set((state) => ({ editCounter: state.editCounter + 1 }))
}))

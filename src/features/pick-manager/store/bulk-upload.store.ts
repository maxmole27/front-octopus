import { BetslipTransformerProps } from '@/features/common/betslips/betslip.transformer'
import { create } from 'zustand'

interface BulkUploadStoreInterface {
  bulkImagesResponse: BetslipTransformerProps[]
  setBulkImagesResponse: (response: BetslipTransformerProps[]) => void
  appendBulkImagesResponse: (response: BetslipTransformerProps) => void
}

export const useBulkUploadStore = create<BulkUploadStoreInterface>((set) => ({
  bulkImagesResponse: [],
  setBulkImagesResponse: (response: BetslipTransformerProps[]) =>
    set({ bulkImagesResponse: response }),
  appendBulkImagesResponse: (response: BetslipTransformerProps) =>
    set((state) => ({
      bulkImagesResponse: [...state.bulkImagesResponse, { ...response }],
    })),
}))

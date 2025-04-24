import { SmartBetResponse } from '@/features/system-manager/types/individual-bet'
import { create } from 'zustand'

interface BulkUploadStoreInterface {
  bulkImagesResponse: SmartBetResponse[]
  setBulkImagesResponse: (response: SmartBetResponse[]) => void
}

export const useBulkUploadStore = create<BulkUploadStoreInterface>((set) => ({
  bulkImagesResponse: [],
  setBulkImagesResponse: (response: SmartBetResponse[]) => {
    set(() => ({ bulkImagesResponse: response }))
  },
}))

import { useQuery } from '@tanstack/react-query'
import { IndividualBet } from '@/features/system-manager/types/individual-bet'
import { useEffect, useState } from 'react'
import { getPickById } from '../../services/getPickById'

interface PickData {
  system_id: number
  bookie_id: number
  stake: number
  money_stake: number
  individual_bets: IndividualBet[]
}

export function useGetPickById(pickId: number, editCounter: number) {
  const [pickData, setPickData] = useState<PickData | null>(null)
  const { data, isLoading: isLoadingPickData } = useQuery<PickData>({
    queryKey: ['pickToEdit', pickId, editCounter],
    queryFn: () => getPickById(pickId),
    enabled: !!pickId && pickId > 0,
    staleTime: 100,
  })

  useEffect(() => {
    if (data) {
      setPickData(data)
    }
  }, [data])

  useEffect(() => {
    // on unmount set pickData to null
    return () => {
      setPickData(null)
    }
  }, [])

  return {
    pickData,
    isLoadingPickData,
  }
}

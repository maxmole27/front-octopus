import { useQuery } from '@tanstack/react-query'
import { getPickById } from '../services/getPickById'
import { IndividualBet } from '@/features/system-manager/types/individual-bet'

interface PickData {
  bookie_id: number
  stake: number
  money_stake: number
  individual_bets: IndividualBet[]
}

export function useGetPickById (pickId : number) {
  const { data: pickData, isLoading: isLoadingPickData } = useQuery<PickData>({
    queryKey: ['pickToEdit', pickId],
    queryFn: () => getPickById(pickId),
    enabled: !!pickId && pickId > 0
  })

  return {
    pickData,
    isLoadingPickData
  }
}

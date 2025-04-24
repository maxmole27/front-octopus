import { IndividualBetCreate } from '@/features/system-manager/types/individual-bet'

export interface PickData {
  system_id: number
  bookie_id: number
  stake: number
  money_stake: number
  individual_bets: IndividualBetCreate[]
}

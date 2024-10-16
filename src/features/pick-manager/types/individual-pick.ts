import { IndividualBetCreate } from '@/features/system-manager/types/individual-bet'

// Interface para utilizar en el formulario de picks
export interface FormPickInterface {
  picks: IndividualBetCreate[]
  bookie_id: number
  system_id: number
  stake: number
  money_stake: number
}

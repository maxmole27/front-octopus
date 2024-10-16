import { IndividualBetCreate } from '@/features/system-manager/types/individual-bet'

interface CreateBetslipWithIndividualBets {
  systemId: number
  bookieId?: number
  individualBets: IndividualBetCreate[]
}

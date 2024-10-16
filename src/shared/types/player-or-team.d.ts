import { SportResponse } from './sport'

export interface PlayerOrTeam {
  id: number
  name: string
  alternative_name?: string
  alternative_name2?: string
  sport_id: number
  sport: SportResponse
}

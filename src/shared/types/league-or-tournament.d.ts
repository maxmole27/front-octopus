import { Location } from './location'

export interface LeagueOrTournament {
  id: number
  name: string
  image_url?: [string]
  sport_id: number
  location_id: number
  alternative_name?: [string]
  alternative_name2?: [string]
  location?: Location
}

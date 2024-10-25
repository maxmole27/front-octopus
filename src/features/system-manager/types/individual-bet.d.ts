import { LeagueOrTournament } from '@/shared/types/league-or-tournament'
import { PlayerOrTeam } from '@/shared/types/player-or-team'

export interface IndividualBet {
  id: number
  created_at: string
  bet_status_id: number
  updated_at: string
  odds: number
  stake: number
  status: string
  league_or_tournament: LeagueOrTournament
  league_or_tournament_id?: number
  player_or_team1_id: number
  player_or_team2_id: number
  player_or_team1: PlayerOrTeam
  player_or_team2: PlayerOrTeam
  sport_id: number
  specific_bet: string
  type_of_bet: string
}

export interface IndividualBetCreate {
  id?: number
  bet_status_id: number
  odds: number
  player_or_team1_id?: number
  player_or_team2_id?: number
  player_or_team1_str?: string
  player_or_team2_str?: string
  league_or_tournament_id?: number
  league_or_tournament_str?: string
  sport_id: number
  specific_bet: string
  type_of_bet: string
}

export interface SmartBetResponse {
  sport: string
  team1: string
  team2: string
  type_of_bet: string
  specific_bet: string
  odds: string
  bet_status: string
  final_score: string
  event_date: string
  event_time: string
  money_stake: string
  potential_win: string
  league_or_tournament: string
}

export interface BetslipsResponse {
  currentPage: number
  data: IndividualBet[]
  totalPages: number
  totalItems: number
  message: string
  code: number
}

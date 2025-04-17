import { IndividualBetCreate } from '@/features/system-manager/types/individual-bet'
import { FormPickInterface } from '@/features/pick-manager/types/individual-pick'
export interface BetslipTransformerProps {
  id?: number
  system_id: number
  bookie_id: number
  stake: number
  money_stake: number
  individual_bets: IndividualBetCreate[]
}

const betslipTransformer = (betslips: FormPickInterface): BetslipTransformerProps => {
  // find the id of the player_or_team1_id and player_or_teams2_id if not exists create a new one
  // find the id of the league_or_tourament_id if not exists create a new one
  return {
    id: betslips.id ?? undefined,
    system_id: betslips.system_id,
    bookie_id: betslips.bookie_id,
    stake: betslips.stake,
    money_stake: betslips.money_stake,
    individual_bets: betslips.picks.map((pick) => {
      return {
        id: pick.id ? parseInt(pick.id.toString()) : -1,
        bet_status_id: pick.bet_status_id ?? 1,
        event_date: new Date(),
        league_or_tournament_id: pick.league_or_tournament_id && pick.league_or_tournament_id.toString().length > 0 ? pick.league_or_tournament_id : -1,
        league_or_tournament_str: pick.league_or_tournament_str,
        odds: pick.odds,
        player_or_team1_id: pick.player_or_team1_id && pick.player_or_team1_id.toString().length > 0 ? pick.player_or_team1_id : -1,
        player_or_team1_str: pick.player_or_team1_str,
        player_or_team2_id: pick.player_or_team2_id && pick.player_or_team2_id.toString().length > 0 ? pick.player_or_team2_id : -1,
        player_or_team2_str: pick.player_or_team2_str,
        specific_bet: pick.specific_bet,
        sport_id: pick.sport_id ?? -1,
        type_of_bet: pick.type_of_bet
      }
    })

  }
}

export default betslipTransformer

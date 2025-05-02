import {
  getAllLeagues,
  getAllParlayPicks,
  getAllParlayPicksAlternate,
  getAllSpecificBets,
  getAllSports,
  getAllTypeOfBets,
  getRealOddsParlay,
  handleOddsParlay,
  handleStatusParlay,
} from '@/shared/utils/pick-manager.utils'
import { BetslipResponse } from '../types/system'
import { format, parseISO } from 'date-fns'
import { BET_STATUS } from '@/ui/constants'

export function handleEventName(
  betslip: BetslipResponse,
  useAlternate = false
): React.ReactNode {
  if (!betslip.individual_bets || betslip.individual_bets.length === 0)
    return <>No Individual Bet !</>
  if (betslip.individual_bets.length === 1)
    return (
      <>
        {betslip.individual_bets[0].player_or_team1.name} vs{' '}
        {betslip.individual_bets[0].player_or_team2.name}
      </>
    )
  if (betslip.individual_bets.length > 1) {
    if (useAlternate) getAllParlayPicks(betslip)
    return getAllParlayPicksAlternate(betslip)
  }
}

export function handleSportName(betslip: BetslipResponse) {
  if (!betslip.individual_bets[0]) return 'No Individual Bet !'
  if (betslip.individual_bets.length === 0)
    return betslip.individual_bets[0].player_or_team1.sport.name
  return getAllSports(betslip)
}

export function handleRegisteredDate(betslip: BetslipResponse) {
  if (!betslip.created_at) return 'No Date'
  return format(parseISO(betslip.created_at), 'yyyy-MM-dd')
}

export function handleLeagueOrTournament(betslip: BetslipResponse) {
  if (!betslip.individual_bets[0]) return 'No Individual Bet !'
  if (betslip.individual_bets.length === 1)
    return betslip.individual_bets[0].league_or_tournament.name
  return getAllLeagues(betslip)
}

export function handleStake(betslip: BetslipResponse) {
  return betslip.stake
}

export function handleOdds(betslip: BetslipResponse) {
  if (!betslip.individual_bets[0]) return 'No Individual Bet !'
  if (betslip.individual_bets.length === 1)
    return `${betslip.individual_bets[0].odds.toFixed(2)} / ${getRealOddsParlay(
      betslip
    )}`
  const result = handleOddsParlay(betslip)

  return `${result} / ${getRealOddsParlay(betslip)}`
}

export function handleStatus(betslip: BetslipResponse) {
  if (!betslip.individual_bets[0]) return 'No Individual Bet !'
  if (betslip.individual_bets.length === 1)
    return BET_STATUS[betslip.individual_bets[0].bet_status_id]
  const result = handleStatusParlay(betslip)
  if (betslip.individual_bets.length > 1) return result
}

export function handleTypeOfBet(betslip: BetslipResponse) {
  if (!betslip.individual_bets[0]) return 'No Individual Bet !'
  if (betslip.individual_bets.length === 1)
    return betslip.individual_bets[0].type_of_bet
  return getAllTypeOfBets(betslip)
}

export function handleSpecificBet(betslip: BetslipResponse) {
  if (!betslip.individual_bets[0]) return 'No Individual Bet !'
  if (betslip.individual_bets.length === 1)
    return betslip.individual_bets[0].specific_bet
  return getAllSpecificBets(betslip)
}

import { IndividualBet } from '@/features/system-manager/types/individual-bet'
import { BetslipResponse } from '@/features/system-manager/types/system'
import {
  BET_STATUS_HALF_LOSS,
  BET_STATUS_HALF_WIN,
  BET_STATUS_LOSE,
  BET_STATUS_PENDING,
  BET_STATUS_VOID,
  BET_STATUS_WON,
} from '@/ui/constants'

export function handleStatusParlay(betslip: BetslipResponse) {
  const statusList: string[] = []
  betslip.individual_bets.map((bet: IndividualBet): string => {
    if (bet.bet_status_id === BET_STATUS_PENDING) {
      statusList.push('PENDING')
      return 'PENDING'
    }
    if (bet.bet_status_id === BET_STATUS_WON) {
      statusList.push('WON')
      return 'WON'
    }
    if (bet.bet_status_id === BET_STATUS_LOSE) {
      statusList.push('LOST')
      return 'LOST'
    }
    statusList.push('VOID')
    return 'VOID'
  })
  if (statusList.includes('LOST')) return 'LOST'
  if (statusList.includes('PENDING')) return 'PENDING'
  if (statusList.includes('WON') && !statusList.includes('LOST')) return 'WON'
  if (
    statusList.includes('WON') &&
    statusList.includes('VOID') &&
    !statusList.includes('LOST')
  )
    return 'PARTIAL WIN'
  if (
    statusList.includes('VOID') &&
    !statusList.includes('LOST') &&
    !statusList.includes('WON')
  )
    return 'VOID'
}

export function handleOddsParlay(betslip: BetslipResponse) {
  const odds = betslip.individual_bets.map((bet: IndividualBet): number => {
    if (bet.bet_status_id === BET_STATUS_VOID) return 1
    if (bet.bet_status_id === BET_STATUS_LOSE) return 0
    if (bet.bet_status_id === BET_STATUS_PENDING) return 1
    if (bet.bet_status_id === BET_STATUS_WON) return bet.odds
    if (bet.bet_status_id === BET_STATUS_HALF_WIN) return bet.odds / 2
    if (bet.bet_status_id === BET_STATUS_HALF_LOSS) return 0
    return bet.odds
  })
  return odds.reduce((acc, bet) => acc * bet, 1).toFixed(2)
}

export function getRealOddsParlay(betslip: BetslipResponse) {
  return betslip.individual_bets
    .reduce((acc, bet) => acc * bet.odds, 1)
    .toFixed(2)
}

export function getAllParlayPicks(betslip: BetslipResponse): React.ReactNode {
  return (
    <>
      <strong>Parlay Pick</strong>
      <div style={{ fontSize: '.8rem' }}>
        {betslip.individual_bets.map((bet: IndividualBet, index: number) => {
          return (
            <div
              key={index}
              style={{
                borderBottom: '1px solid rgba(255,255,255, 0.1)',
                margin: '.1rem',
                fontStyle: 'italic',
              }}
            >
              <span>
                {bet.player_or_team1.name} vs {bet.player_or_team2.name}
              </span>
              <br />
            </div>
          )
        })}
      </div>
    </>
  )
}

export function getAllParlayPicksAlternate(
  betslip: BetslipResponse
): React.ReactNode {
  return (
    <div className="pick-data__alternate">
      <div style={{ fontSize: '.8rem' }}>
        {betslip.individual_bets.map((bet: IndividualBet, index: number) => {
          return (
            <div key={index}>
              <span>
                {bet.player_or_team1.name} vs {bet.player_or_team2.name}
              </span>
              <br />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function getAllSpecificBets(betslip: BetslipResponse): React.ReactNode {
  return (
    <>
      <div style={{ fontSize: '.8rem' }}>
        {betslip.individual_bets.map((bet: IndividualBet, index: number) => {
          return (
            <div key={index}>
              <span>{bet.specific_bet}</span>
              <br />
            </div>
          )
        })}
      </div>
    </>
  )
}

export function getAllTypeOfBets(betslip: BetslipResponse): React.ReactNode {
  return (
    <>
      <div style={{ fontSize: '.8rem' }}>
        {betslip.individual_bets.map((bet: IndividualBet, index: number) => {
          return (
            <div key={index}>
              <span>{bet.type_of_bet}</span>
              <br />
            </div>
          )
        })}
      </div>
    </>
  )
}

export function getAllLeagues(betslip: BetslipResponse): React.ReactNode {
  return (
    <>
      <div style={{ fontSize: '.8rem' }}>
        {betslip.individual_bets.map((bet: IndividualBet, index: number) => {
          return (
            <div key={index}>
              <span>{bet.league_or_tournament.name}</span>
              <br />
            </div>
          )
        })}
      </div>
    </>
  )
}

export function getAllSports(betslip: BetslipResponse): React.ReactNode {
  return (
    <>
      <div style={{ fontSize: '.8rem' }}>
        {betslip.individual_bets.map((bet: IndividualBet, index: number) => {
          return (
            <div key={index}>
              <span>{bet.player_or_team1.sport.name}</span>
              <br />
            </div>
          )
        })}
      </div>
    </>
  )
}

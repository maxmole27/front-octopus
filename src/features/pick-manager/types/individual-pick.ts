export interface IndividualPick {
  sport?: string
  teamPlayer1?: string
  teamPlayer2?: string
  odds?: number
}

export interface IndividualPickFromSmartBet {
  bet_status?: string
  event_date?: Date
  event_time?: string
  final_score: string | null
  money_stake?: number
  odds?: number
  potential_win?: number
  specific_bet?: string
  sport?: string
  team1?: string
  team2?: string
  type_of_bet?: string
}

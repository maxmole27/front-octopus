import { IndividualPick, IndividualPickFromSmartBet } from '../types/individual-pick'

export function individualPickAdapter (apiCallData: IndividualPickFromSmartBet[]): IndividualPick[] {
  console.log('apiCallData', apiCallData)
  const data: IndividualPick[] = apiCallData.map((item) => {
    return {
      sport: item?.sport,
      teamPlayer1: item?.team1,
      teamPlayer2: item?.team2,
      odds: item?.odds || 0
    }
  })
  return data
}

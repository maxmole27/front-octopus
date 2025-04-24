import { FormPickInterface } from '@/features/pick-manager/types/individual-pick'
import { PickData } from '@/features/pick-manager/types/pick-data'
import { getLeagueOrTournament } from '@/shared/utils/get-league-or-tournament'
import { getPlayerOrTeam } from '@/shared/utils/get-player-or-team'
import { Dispatch, SetStateAction, useEffect } from 'react'
import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormSetValue,
} from 'react-hook-form'

interface AppendBetProps {
  pickData: PickData | null
  setValue: UseFormSetValue<FormPickInterface>
  remove: UseFieldArrayRemove
  setEnumPicks: Dispatch<SetStateAction<number>>
  append: UseFieldArrayAppend<FormPickInterface, 'picks'>
}
/**   **/
export function useAppendBet({
  pickData,
  setValue,
  remove,
  setEnumPicks,
  append,
}: AppendBetProps) {
  useEffect(() => {
    function fetchAndAppendBets() {
      if (pickData === undefined) return
      remove()
      if (pickData) {
        setValue('bookie_id', pickData.bookie_id)
        setValue('stake', pickData.stake)
        setValue('money_stake', pickData.money_stake)

        pickData.individual_bets?.forEach(async (item) => {
          try {
            // Espera para obtener los datos de liga o torneo
            const league = await getLeagueOrTournament(
              item.league_or_tournament_id ?? -1
            )
            // Espera para obtener los datos de equipo o jugador 1
            const playerOrTeam1 = await getPlayerOrTeam(
              item.player_or_team1_id ?? -1
            )
            // Espera para obtener los datos de equipo o jugador 2
            const playerOrTeam2 = await getPlayerOrTeam(
              item.player_or_team2_id ?? -1
            )

            setEnumPicks((prev) => prev + 1)
            append({
              id: item.id ?? undefined,
              sport_id: item.sport_id,
              player_or_team1_id: item.player_or_team1_id ?? -1,
              player_or_team2_id: item.player_or_team2_id ?? -1,
              league_or_tournament_id: item.league_or_tournament_id ?? -1,
              bet_status_id: item.bet_status_id,
              league_or_tournament_str: league?.name || 'Desconocido',
              player_or_team1_str: playerOrTeam1?.name || 'Desconocido',
              player_or_team2_str: playerOrTeam2?.name || 'Desconocido',
              specific_bet: item.specific_bet,
              type_of_bet: item.type_of_bet,
              odds: item.odds,
            })
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        })
      }
    }

    fetchAndAppendBets()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickData])
}

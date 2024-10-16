import { LeagueOrTournament } from '@/shared/types/league-or-tournament'

export function getTournamentById (id: number): Promise<LeagueOrTournament> {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/league_or_tournaments/${id}`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
}

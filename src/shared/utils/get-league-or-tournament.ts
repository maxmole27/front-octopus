import { getTournamentById } from '@/features/system-manager/services/torunaments.service'
import { LeagueOrTournament } from '../types/league-or-tournament'

export async function getLeagueOrTournament(
  id: number
): Promise<LeagueOrTournament> {
  const league = await getTournamentById(id)
  return league
}

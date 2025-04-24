import { getPlayerOrTeamById } from '@/features/system-manager/services/playerOrTeams.service'
import { PlayerOrTeam } from '../types/player-or-team'

export async function getPlayerOrTeam(id: number): Promise<PlayerOrTeam> {
  const playerOrTeam = await getPlayerOrTeamById(id)
  return playerOrTeam
}

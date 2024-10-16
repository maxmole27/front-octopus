import { PlayerOrTeam } from '@/shared/types/player-or-team'

export function getPlayerOrTeamById (id: number): Promise<PlayerOrTeam> {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/player_or_team/${id}`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
}

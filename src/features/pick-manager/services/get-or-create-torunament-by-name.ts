// import { LeagueOrTournament } from '@/shared/types/league-or-tournament'

// function getOrCreateTournamentByName (name: string, sportId: number, leageOrTournament: LeagueOrTournament): Promise<LeagueOrTournament> {
//   return fetch(`${import.meta.env.VITE_API_BASE_URL}/league_or_tournaments/find_or_create`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name,
//       sport_id: sportId,
//       league_or_tournament: leageOrTournament
//     })
//   })
//     .then(response => response.json())
//     .catch(error => console.error('Error:', error))
// }

// export default getOrCreateTournamentByName

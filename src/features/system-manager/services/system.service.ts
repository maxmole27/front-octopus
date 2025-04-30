import { FormSystemCreate, SystemResponse } from '../types/system'

export function createSystemService(newSystem: FormSystemCreate) {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/systems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newSystem),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error)
      }
      return data
    })
    .catch((error) => {
      console.error('Error:', error)
      throw new Error('Error creating system')
    })
}

interface IGetSystemsService {
  pageParam: number
  system_name?: string
}
export function getSystemsService({
  pageParam,
  system_name,
}: IGetSystemsService) {
  const searchParams = new URLSearchParams()
  searchParams.append('page', pageParam.toString())
  if (system_name) searchParams.set('system_name', system_name)
  console.log('searchParams', searchParams.toString())
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/systems?${searchParams}`)
    .then((response) => response.json())
    .catch((error) => console.error('Error:', error))
}

export function getSystemById(id: number): Promise<SystemResponse> {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/systems/${id}`)
    .then((response) => response.json())
    .catch((error) => console.error('Error:', error))
}

interface IGetBetsBySystem {
  pageParam: number
  systemId: number
  startDate?: string
  endDate?: string
  sports?: number[]
  teamOrPlayer?: string
}

export function getBetsBySystem({
  pageParam,
  systemId,
  startDate,
  endDate,
  sports,
  teamOrPlayer,
}: IGetBetsBySystem) {
  const searchParams = new URLSearchParams()
  searchParams.set('page', (pageParam - 1).toString())
  if (startDate) searchParams.set('start_date', startDate)
  if (endDate) searchParams.set('end_date', endDate)
  if (sports && sports.length > 0)
    searchParams.set('sport_list', sports.join(','))
  if (teamOrPlayer) searchParams.set('team_name', teamOrPlayer)
  return fetch(
    `${
      import.meta.env.VITE_API_BASE_URL
    }/betslips/system/${systemId}?${searchParams.toString()}`
  )
    .then((response) => response.json())
    .catch((error) => console.error('Error:', error))
}

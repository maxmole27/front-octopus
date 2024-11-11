import { FormSystemCreate, SystemResponse } from '../types/system'

export function createSystemService (newSystem: FormSystemCreate) {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/systems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newSystem)
  }).then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error)
      }
      return data
    })
    .catch(error => {
      console.error('Error:', error)
      throw new Error('Error creating system')
    })
}

export function getSystemsService ({ pageParam }: { pageParam: number }) {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/systems?page=${pageParam}`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
}

export function getSystemById (id: number): Promise<SystemResponse> {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/systems/${id}`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
}

interface IGetBetsBySystem {
  pageParam: number
  systemId: number
  startDate?: string
  endDate?: string
  sports?: number[]
}

export function getBetsBySystem ({ pageParam, systemId, startDate, endDate, sports }: IGetBetsBySystem) {
  console.log('aaaaaa', sports)
  const searchParams = new URLSearchParams()
  searchParams.set('page', (pageParam - 1).toString())
  if (startDate) searchParams.set('start_date', startDate)
  if (endDate) searchParams.set('end_date', endDate)
  if (sports && sports.length > 0) searchParams.set('sports', sports.join(','))
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/betslips/system/${systemId}?${searchParams.toString()}`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
}

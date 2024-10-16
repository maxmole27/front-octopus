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

export function getBetsBySystem ({ pageParam, systemId }: { pageParam: number, systemId: number }) {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/betslips/system/${systemId}?page=${pageParam - 1}`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
}

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

export function getSystemsService () {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/systems`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
}

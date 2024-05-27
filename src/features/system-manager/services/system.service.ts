export function createSystemService (newSystem: FormSystemCreate) {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/systems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newSystem)
  }).then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error))
}

export function getSystemsService () {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/systems`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
}

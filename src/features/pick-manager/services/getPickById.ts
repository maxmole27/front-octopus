export function getPickById (pickId: number) {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/betslips/${pickId}`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
}

export function getBetStatuses () {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/bet_statuses/raw`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error)
      }
      return data
    })
    .catch(error => {
      console.error('Error:', error)
      throw new Error('Error getting bet statuses')
    })
}

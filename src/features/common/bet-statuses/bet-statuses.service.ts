function getBetStatuses () {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/bet_statuses/raw`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
}

export default getBetStatuses

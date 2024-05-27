function rawSportsService () {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/sports`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
}

export default rawSportsService

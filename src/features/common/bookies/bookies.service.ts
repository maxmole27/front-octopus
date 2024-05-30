function rawBookiesService () {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/bookies_raw`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
}

export default rawBookiesService
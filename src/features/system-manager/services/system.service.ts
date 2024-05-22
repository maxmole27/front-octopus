

function systemService() {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/systems`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
}

export default systemService
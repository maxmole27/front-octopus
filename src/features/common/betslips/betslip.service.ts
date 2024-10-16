import { BetslipTransformerProps } from './betslip.transformer'

export function createBetslipWithIndividualBets (newBetslip: BetslipTransformerProps) {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/betslips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBetslip)
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

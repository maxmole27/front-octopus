import Heading from '@/ui/components/heading/heading'
import { useEffect } from 'react'

function Dashboard () {
  useEffect(() => {
    console.log(import.meta.env.VITE_API_BASE_URL)
  }, [])
  return (
    <div>
      <Heading level={2}>Dashboard</Heading>
    </div>
  )
}

export default Dashboard

import Heading from '@/ui/components/heading/heading'
import { Button } from 'primereact/button'
import { useEffect } from 'react'
import BoardCard from './components/board-card/board-card'
import './dashboard.css'

function Dashboard() {
  useEffect(() => {
    console.log(import.meta.env.VITE_API_BASE_URL)
  }, [])
  return (
    <div>
      <Heading level={2}>Dashboard</Heading>
      <div className="board__wrapper">
        <BoardCard
          title="Global Yield 7 days"
          content={<span>2025-06-01 - 2025-06-07</span>}
          metric={<span>5.7%</span>}
        />
        <BoardCard
          title="Global Yield 30 days"
          content={<span>2025-06-01 - 2025-06-30</span>}
          metric={<span>100%</span>}
        />
        <BoardCard
          title="Global Yield last year"
          content={<span>2025-01-01 - 2025-06-30</span>}
          metric={<span>100%</span>}
        />
      </div>

      <Heading level={2}>Quick Actions</Heading>
      <section className="quick-actions">
        <div className="quick-actions__buttons">
          <Button
            label="Add new pick to 'Titi Henry'"
            severity="info"
            className="quick-actions__button"
          />
          <Button
            label="Add new pick to 'Cristiano Ronaldo'"
            severity="info"
            className="quick-actions__button"
          />
          <Button
            label="Add new pick to 'Cristiano Ronaldo'"
            severity="info"
            className="quick-actions__button"
          />
          <Button
            label="Add new pick to 'Cristiano Ronaldo'"
            severity="info"
            className="quick-actions__button"
          />
        </div>
      </section>
    </div>
  )
}

export default Dashboard

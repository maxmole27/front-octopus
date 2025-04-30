import { useState } from 'react'
import './board-card.css'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa6'

interface BoardCardProps {
  title: string
  metric: JSX.Element
  content: JSX.Element
}

function BoardCard({ title, metric, content }: BoardCardProps) {
  const [isContentVisible, setIsContentVisible] = useState(false)
  return (
    <>
      <div className="board-card">
        <div className="board-card__header">
          <h5>{title}</h5>{' '}
          <span
            className="board-card__header--icon"
            onClick={() => setIsContentVisible(!isContentVisible)}
          >
            {isContentVisible ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="board-card__content">
          {isContentVisible ? metric : '---'}
        </div>
        <div className="board-card__footer">{content}</div>
      </div>
    </>
  )
}

export default BoardCard

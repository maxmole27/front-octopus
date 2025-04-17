import { Link, useLocation } from 'react-router'
import './system-card.css'
import defaultImage from '@assets/system-lbtennis.png'
import { Button } from 'primereact/button'
import { AiOutlineOrderedList } from 'react-icons/ai'
import { AiFillSignal } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'

interface SystemCardProps {
  id: number
  name: string
  image: string
}

function SystemCard({ name, id, image }: SystemCardProps) {
  const location = useLocation()
  const handleAddPick = () => {
    location.pathname = `/systems-manager/systems/${id}/add-pick`
  }
  return (
    <article className="system-card">
      <header className="system-card__header">
        <h3> {name} </h3>
      </header>
      <figure className="system-card__image">
        <img src={image && image.length > 0 ? image : defaultImage} alt="" />
      </figure>
      <section className="system-card__actions">
        <Link to={`/systems-manager/systems/${id}`}>
          <AiOutlineOrderedList />
        </Link>
        <Link to={`/systems-manager/systems/${id}/metrics`}>
          <AiFillSignal />
        </Link>
        <Link to={`/systems-manager/systems/${id}/edit`}>
          <AiFillEdit />
        </Link>
        <Link to={`/systems-manager/systems/${id}/delete`}>
          <AiFillDelete />
        </Link>
      </section>
      <section className="system-card__button">
        <Link to={`/pick-manager?system=${id}`}>
          <Button
            severity="success"
            onClick={handleAddPick}
            icon={<AiOutlinePlus />}
            label="Add Pick"
          />
        </Link>
      </section>
    </article>
  )
}

export default SystemCard

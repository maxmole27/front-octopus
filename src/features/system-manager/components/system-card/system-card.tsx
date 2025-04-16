import { Link, useLocation } from 'react-router'
import './system-card.css'
import {
  IconDeleteSystems,
  IconEditSystems,
  IconListSystems,
  IconMetricsSystem

} from '@/features/system-manager/system-manager-icons'
import defaultImage from '@assets/system-lbtennis.png'
import { Button } from 'primereact/button'

interface SystemCardProps {
  id: number;
  name: string;
  image: string;
}

function SystemCard ({ name, id, image }: SystemCardProps) {
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
          <IconListSystems />
        </Link>
        <Link to={`/systems-manager/systems/${id}/metrics`}>
          <IconMetricsSystem />
        </Link>
        <Link to={`/systems-manager/systems/${id}/edit`}>
          <IconEditSystems />
        </Link>
        <Link to={`/systems-manager/systems/${id}/delete`}>
          <IconDeleteSystems />
        </Link>
      </section>
      <section className="system-card__button">
        <Link to={`/pick-manager?system=${id}`}>
          <Button onClick={handleAddPick} icon="pi pi-plus" label="Add Pick" />
        </Link>
      </section>
    </article>
  )
}

export default SystemCard

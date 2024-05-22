import { Link } from "react-router-dom"
import './system-card.css'
import { IconDeleteSystems, IconEditSystems, IconListSystems, IconMetricsSystem } from "@/features/system-manager/system-manager-icons"
import defaultImage from "@assets/system-lbtennis.png"


interface SystemCardProps {
  id: number
  name: string
  image: string
}

function SystemCard({ name, id, image }: SystemCardProps) {
  return (
    <article className="system-card">
      <header className="system-card__header">
        <h3> {name} </h3>
      </header>
      <figure className="system-card__image">
        <img src={image && image.length > 0 ? image : defaultImage} alt="" />
      </figure>
      <section className="system-card__actions">
        <Link to={`/systems-manager/systems/${id}`}><IconListSystems /></Link>
        <Link to={`/systems-manager/systems/${id}/metrics`}><IconMetricsSystem /></Link>
        <Link to={`/systems-manager/systems/${id}/edit`}><IconEditSystems /></Link>
        <Link to={`/systems-manager/systems/${id}/delete`}><IconDeleteSystems /></Link>
      </section>
    </article>
  )
}

export default SystemCard
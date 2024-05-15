import { Link } from "react-router-dom"
import image from "@assets/system-lbtennis.png"
import './system-card.css'
import { IconDeleteSystems, IconEditSystems, IconListSystems, IconMetricsSystem } from "@/features/system-manager/system-manager-icons"

function SystemCard() {
  return (
    <article className="system-card">
      <header className="system-card__header">
        <h3> lbtennis system</h3>
      </header>
      <figure className="system-card__image">
        <img src={image} alt="" />
      </figure>
      <section className="system-card__actions">
        <Link to="/systems-manager/systems/1"><IconListSystems /></Link>
        <Link to="/systems-manager/systems/1/metrics"><IconMetricsSystem /></Link>
        <Link to="/systems-manager/systems/1/edit"><IconEditSystems /></Link>
        <Link to="/systems-manager/systems/1/delete"><IconDeleteSystems /></Link>
      </section>
    </article>
  )
}

export default SystemCard
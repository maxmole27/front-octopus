import { ReactNode } from 'react'
import { Link } from 'react-router'
import './sidebar-element.css'

interface SidebarElementProps {
  url: string;
  children: ReactNode;
}

function SidebarElement ({ url, children }: SidebarElementProps) {
  return (
    <li>
      <Link to={url} className="sidebar-element">
        {children}
      </Link>
    </li>
  )
}

export default SidebarElement

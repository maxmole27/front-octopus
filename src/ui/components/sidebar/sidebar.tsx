import { IconDashboard } from '@/assets/icon-dashboard'
import SidebarElement from './components/sidebar-element'
import './sidebar.css'
import { IconSystems } from '@/assets/icon-systems'
import { IconMetrics } from '@/assets/icon-metrics'
import { IconSettings } from '@/assets/icon-settings'

function Sidebar() {
  return (
    <aside className='sidebar'>
      <nav>
        <ul>
          <SidebarElement url='/'><IconDashboard /></SidebarElement>
          <SidebarElement url='/'><IconSystems /></SidebarElement>
          <SidebarElement url='/'><IconMetrics /></SidebarElement>
          <SidebarElement url='/'><IconSettings /></SidebarElement>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
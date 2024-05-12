import { IconDashboard } from '@/assets/icons/icon-dashboard'
import SidebarElement from './components/sidebar-element'
import './sidebar.css'
import { IconSystems } from '@/assets/icons/icon-systems'
import { IconMetrics } from '@/assets/icons/icon-metrics'
import { IconSettings } from '@/assets/icons/icon-settings'

function Sidebar() {
  return (
    <aside className='sidebar'>
      <nav>
        <ul>
          <SidebarElement url='/'><IconDashboard /></SidebarElement>
          <SidebarElement url='/systems-manager'><IconSystems /></SidebarElement>
          <SidebarElement url='/'><IconMetrics /></SidebarElement>
          <SidebarElement url='/'><IconSettings /></SidebarElement>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
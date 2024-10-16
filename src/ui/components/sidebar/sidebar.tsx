import { IconDashboard } from '@/assets/icons/icon-dashboard'
import SidebarElement from './components/sidebar-element'
import './sidebar.css'
import { IconSystems } from '@/assets/icons/icon-systems'
import { IconMetrics } from '@/assets/icons/icon-metrics'
import { IconSettings } from '@/assets/icons/icon-settings'

function Sidebar () {
  return (
    <aside className='sidebar'>
      <nav>
        <ul>
          <SidebarElement url='/'>
            <IconDashboard />
            <p className='linktext'>Dashboard</p>
          </SidebarElement>
          <SidebarElement url='/systems-manager'>
            <IconSystems />
            <p className='linktext'>Systems</p>
          </SidebarElement>
          <SidebarElement url='/'>
            <IconMetrics />
            <p className='linktext'>Metrics</p>
          </SidebarElement>
          <SidebarElement url='/'>
            <IconSettings />
            <p className='linktext'>Settings</p>
          </SidebarElement>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

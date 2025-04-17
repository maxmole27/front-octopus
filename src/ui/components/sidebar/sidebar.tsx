import SidebarElement from './components/sidebar-element'
import { GoHomeFill } from "react-icons/go";
import { AiFillSetting } from "react-icons/ai";
import { AiFillSignal } from "react-icons/ai";
import { AiFillHdd } from "react-icons/ai";
import './sidebar.css'

function Sidebar () {
  return (
    <aside className='sidebar'>
      <nav>
        <ul>
          <SidebarElement url='/'>
            <GoHomeFill />
            <p className='linktext'>Dashboard</p>
          </SidebarElement>
          <SidebarElement url='/systems-manager'>
            <AiFillHdd />
            <p className='linktext'>Systems</p>
          </SidebarElement>
          <SidebarElement url='/'>
            <AiFillSignal />
            <p className='linktext'>Metrics</p>
          </SidebarElement>
          <SidebarElement url='/'>
            <AiFillSetting />
            <p className='linktext'>Settings</p>
          </SidebarElement>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

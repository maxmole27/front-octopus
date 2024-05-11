import { Outlet } from 'react-router-dom'
import Sidebar from '@components/sidebar/sidebar'
import './dashboard.css'
import Header from '@components/header/header'
import Subheader from '../components/subheader/subheader'

function DashboardLayout() {
  return (
    <div>
      <div className='sidebar_wrapper'>
        <Sidebar />
      </div>
      <div className="header_wrapper">
        <Header />
      </div>
      <div className='subheader_wrapper'>
        <Subheader />
      </div>
      <main className='content_main'>
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
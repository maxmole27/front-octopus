import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardLayout from '@ui/layouts/dashboard.layout'
import Dashboard from '@features/dashboard/dashboard'
import SystemManager from '@features/system-manager/system-manager'
import FormCreateSystem from './features/system-manager/create/form-create-system'
import AddPick from './features/pick-manager/add/add-pick'
import PickList from './features/system-manager/pick-list/pick-list'

export const Router = () => {
  return (
    <BrowserRouter>

    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="users" element={<div>Users</div>} />
        <Route path="systems-manager" element={<SystemManager />} />
        <Route path="systems-manager/create" element={<FormCreateSystem />} />
        <Route path="systems-manager/systems/:id" element={<PickList />} />

        <Route path="pick-manager" element={<AddPick />} />
      </Route>

    </Routes>
    </BrowserRouter>

  )
}

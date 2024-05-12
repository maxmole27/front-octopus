import { BrowserRouter, Routes, Route } from "react-router-dom"
import DashboardLayout from "@ui/layouts/dashboard.layout"
import Dashboard from "@features/dashboard/dashboard"
import SystemManager from "@features/system-manager/system-manager"

export const Router = () => {
  return (
    <BrowserRouter>

    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="users" element={<div>Users</div>} />
        <Route path="systems-manager" element={<SystemManager />} />
      </Route>

    </Routes>
    </BrowserRouter>

  )
}
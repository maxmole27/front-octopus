import { BrowserRouter, Routes, Route } from "react-router-dom"
import DashboardLayout from "./ui/layouts/dashboard.layout"

export const Router = () => {
  return (
    <BrowserRouter>

    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="" element={<div>Dashboard</div>} />
        <Route path="users" element={<div>Users</div>} />
      </Route>

    </Routes>
    </BrowserRouter>

  )
}
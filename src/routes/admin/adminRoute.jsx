import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AdminProtect from './adminProtected'
import AdminPublic from './adminPublic'
import AdminLogin from '../../Admin/pages/loginPage'
import AdminHome from '../../Admin/pages/AdminHome'
import AdminLayout from '../../Admin/pages/AdminLayout'

function AdminRoute() {
  return (
    <Routes>
          <Route path="/" element={<AdminPublic><AdminLogin /></AdminPublic>} />
          <Route  path="/home" element={<AdminLayout/>}>
          <Route index element={<AdminProtect><AdminHome /></AdminProtect>} />
          </Route>

    </Routes>
  )
}

export default AdminRoute
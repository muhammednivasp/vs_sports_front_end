import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AdminProtect from './adminProtected'
import AdminPublic from './adminPublic'
import AdminLogin from '../../Admin/pages/loginPage'
import AdminHome from '../../Admin/pages/AdminHome'
import AdminLayout from '../../Admin/pages/AdminLayout'
// import Club from '../../Admin/components/Club'

function AdminRoute() {
  return (
    <Routes>
          <Route path="/" element={<AdminPublic><AdminLogin /></AdminPublic>} />
          <Route  path="/home" element={<AdminLayout/>}>
          <Route index element={<AdminProtect><AdminHome data={'graphs'}/></AdminProtect>} />
          <Route exact path='/home/club' element={<AdminProtect><AdminHome data={'club'} /></AdminProtect>} />
          <Route exact path='/home/users' element={<AdminProtect><AdminHome data={'user'} /></AdminProtect>} />
          <Route exact path='/home/tournaments' element={<AdminProtect><AdminHome data={'tournaments'} /></AdminProtect>} />
          <Route exact path='/home/matches' element={<AdminProtect><AdminHome data={'matches'} /></AdminProtect>} />
          {/* <Route exact path='/home/tickets' element={<AdminProtect><AdminHome data={'tickets'} /></AdminProtect>} /> */}
          

          </Route>

    </Routes>
  )
}

export default AdminRoute
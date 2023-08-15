import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingPage'
import UserRoute from './routes/user/routeSetup'
import ClubRoute from './routes/club/clubRoute'
import AdminRoute from './routes/admin/adminRoute'
import { Toaster } from 'react-hot-toast'
import UserPublic from './routes/user/userPublic'

function App() {

  return (

    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>

        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/user/*" element={<UserRoute />} />
        <Route exact path="/club/*" element={<ClubRoute />} />
        <Route exact path="/admin/*" element={<AdminRoute />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App

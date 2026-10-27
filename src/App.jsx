import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import PatientDashboard from './pages/PatientDashboard'
import AppointmentBooking from './pages/AppointmentBooking'
import SymptomChecker from './pages/SymptomChecker'
import MyAppointments from './pages/MyAppointment'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/privacy' element={<Privacy/>}/>
            <Route path='/terms' element={<Terms/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Route>
          <Route path='/dashboard' element={<PatientDashboard/>} />
          <Route path='/appointment/book' element={<AppointmentBooking/>} />
          <Route path='/symptom-checker' element={<SymptomChecker/>} />
          <Route path='/appointments' element={<MyAppointments/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

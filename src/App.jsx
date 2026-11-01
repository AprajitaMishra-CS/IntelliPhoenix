import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import Layout from './components/Layout'
import PatientLayout from './components/PatientLayout'

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
import MedicalRecords from './pages/MedicalRecords'
import Prescriptions from './pages/Prescriptions'
import Notifications from './pages/Notifications'
import DoctorDashboard from './pages/DoctorDashboard'
import AdminDashboard from './pages/AdminDashboard'

function RoleBasedNotifications() {
  const storedUser = sessionStorage.getItem("user");

  let user = {};

  try {
    user = storedUser ? JSON.parse(storedUser) : {};
  } catch(error) {
    user = {};
  }

  if(user.role === "patient") {
    return (
      <PatientLayout>
        <Notifications/>
      </PatientLayout>
    );
  }

  if(user.role === "doctor") {
    return <DoctorDashboard initialTab="Notifications" />;
  }

  if(user.role === "admin") {
    return <AdminDashboard initialTab="Notifications" />;
  }

  return <Navigate to="/login" replace />;
}

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
          </Route>

          <Route element={<PatientLayout/>}>
            <Route path='/dashboard' element={<PatientDashboard/>} />
            <Route path='/appointment/book' element={<AppointmentBooking/>} />
            <Route path='/symptom-checker' element={<SymptomChecker/>} />
            <Route path='/appointments' element={<MyAppointments/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/medical-records' element={<MedicalRecords/>} />
            <Route path='/prescriptions' element={<Prescriptions/>} />
          </Route>

          <Route path='/notifications' element={<RoleBasedNotifications/>} />

          <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
          <Route path='/admin-dashboard' element={<AdminDashboard/>} />

          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

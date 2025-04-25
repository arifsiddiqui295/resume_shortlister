import React from 'react'
import Home from './pages/Home'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Users_Profile from './pages/Users_Profile'
import RecuiterSearch from './pages/RecuiterSearch'
import RecruiterSearchResults from './pages/RecruiterSearchResults'
import Job from './pages/Job'
import ApplicationStatus from './pages/ApplicationStatus'
import StudentLogin from './pages/StudentLogin'
import ProtectedRoutes from './Components/ProtectedRoutes'
import NotFound from './Components/NotFound'
import { StudentProvider } from './context/StudentProvider'

const App = () => {
  return (
    <StudentProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile'
            element={
              <ProtectedRoutes>
                <Users_Profile />
              </ProtectedRoutes>
            }
          />
          <Route path='/student-login' element={<StudentLogin />} />
          <Route path='/job' element={
            <ProtectedRoutes>
              <Job />
            </ProtectedRoutes>
          } />
          <Route path='/recuiter-search' element={<RecuiterSearch />} />
          <Route path='/application-status' element={
            <ProtectedRoutes>
              <ApplicationStatus />
            </ProtectedRoutes>
          } />
          <Route path='/recuiter-results' element={<RecruiterSearchResults />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  )
}

export default App


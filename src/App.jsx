import React from 'react'
import Home from './pages/Home'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Users_Profile from './pages/Users_Profile'
import RecuiterSearch from './pages/RecuiterSearch'
import RecruiterSearchResults from './pages/RecruiterSearchResults'
import Job from './pages/Job'
import ApplicationStatus from './pages/ApplicationStatus'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Users_Profile />} />
        <Route path='/job' element={<Job />} />
        <Route path='/recuiter-search' element={<RecuiterSearch />} />
        <Route path='/application-status' element={<ApplicationStatus />} />
        <Route path='/recuiter-results' element={<RecruiterSearchResults />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


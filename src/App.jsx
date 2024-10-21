import React from 'react'
import Home from './pages/Home'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './pages/Profile'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


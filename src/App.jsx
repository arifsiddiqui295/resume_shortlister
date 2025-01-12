import React from 'react'
import Home from './pages/Home'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Users_Profile from './pages/Users_Profile'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Users_Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


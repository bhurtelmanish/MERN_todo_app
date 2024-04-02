import React from 'react'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import {Routes , Route} from 'react-router-dom'
import Pages from './pages/Pages'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/*' element={<Pages />} />
    </Routes>
    </>
  )
}

export default App
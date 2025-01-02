import React from 'react'
import { Routes, Route } from 'react-router-dom'

import FullLayout from './views/fullLayout'
import Login from './views/login'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<FullLayout />} />
    </Routes>
  )
}

export default App

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Coins from './routes/Coins'
const Router = () => {
  return (
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<Coins></Coins>}></Route>
        <Route></Route>
     </Routes>
    </BrowserRouter>
    
  )
}

export default Router
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Coins from './routes/Coins'
import Socket from './components/Socket'
const Router = () => {
  return (
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<Coins></Coins>}></Route>
        <Route path='/socket' element={<Socket></Socket>}></Route>
     </Routes>
    </BrowserRouter>
    
  )
}

export default Router
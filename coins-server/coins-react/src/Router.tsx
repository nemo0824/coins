import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Coins from './routes/Coins'
import CoinDetail from './components/CoinDetail'
import Login from './routes/Login'

const Router = () => {
  return (
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<Coins></Coins>}/>
        <Route path='/coin/:id' element={<CoinDetail></CoinDetail>}/>
        <Route path='/login' element={<Login></Login>}/>
     </Routes>
    </BrowserRouter>
    
  )
}

export default Router
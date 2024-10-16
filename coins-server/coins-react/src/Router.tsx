import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Coins from './routes/Coins'
import CoinDetail from './components/CoinDetail'

const Router = () => {
  return (
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<Coins></Coins>}/>
        <Route path='/coin/:id' element={<CoinDetail></CoinDetail>}/>
     </Routes>
    </BrowserRouter>
    
  )
}

export default Router
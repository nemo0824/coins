import React from 'react'
// import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Coins from './routes/Coins'
import CoinDetail from './components/CoinDetail'
import Login from './routes/Login'
import Redirect from './routes/Redirect'
import PostDetail from './components/PostDetail'
import NotFound from './components/NotFound'

const Router = () => {
  return (

     <Routes>
        <Route path='/' element={<Coins></Coins>}/>
        <Route path='/coin/:id' element={<CoinDetail></CoinDetail>}/>
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/redirect' element={<Redirect></Redirect>}/>
        <Route path='/coin/:id/post/:postId' element={<PostDetail></PostDetail>}/>
        <Route path='*' element={<NotFound></NotFound>}/>
     </Routes>
    
    
  )
}

export default Router
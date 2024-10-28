import React from 'react'
import { CoinChart } from './CoinChart'
import { useLocation} from 'react-router-dom'
import Post from './Post'
const CoinDetail = () => {
  const location = useLocation()
  const {displayName} = location.state
  return (
    <div>
      <h3 className='text-white'>{displayName}</h3>
      <CoinChart></CoinChart>
      <h3 className='text-white'>게시판</h3>
      <Post></Post>
    </div>
  )
}

export default CoinDetail
import React from 'react'
import { CoinChart } from './CoinChart'
import { useLocation} from 'react-router-dom'
const CoinDetail = () => {
  const location = useLocation()
  const {displayName} = location.state
  return (
    <div>
      <h3 className='text-white'>{displayName}</h3>
      <CoinChart></CoinChart>
    </div>
  )
}

export default CoinDetail
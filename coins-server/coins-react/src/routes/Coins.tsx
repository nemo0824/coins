import React, { useEffect, useState } from 'react'
import axios from 'axios';

interface CoinName{
  market:string;
  korean_name:string;
  english_name:string
}


const Coin = ({coin}:{coin: CoinName}) =>{
  return (
    <>
     <tr>
      <td>{coin.market}</td>
      <td>{coin.korean_name}</td>
      <td>{coin.english_name}</td>
     </tr> 
    </>
  )
}



const Coins = () => {
  const [prices, setPrices] = useState<CoinName[]>([]);
  useEffect(()=>{
    getCoinsName()
    // console.log(prices)

    const socket = new WebSocket('ws//localhost:4000ㅌ')

    socket.onopen = ()=>{
      console.log('노드 서버랑 연결')
    }


  }, [])
  const getCoinsName = () =>{
    axios.get('https://api.bithumb.com/v1/market/all').then(response => setPrices(response.data))
  }

  return (
    <div className='flex justify-center items-center'>
      <table>
        <tr className='bg-black text-white'>
          <th>코드</th>
          <th>한국이름</th>
          <th>영어이름</th>
        </tr>
      {
      prices?.slice(0,100).map( coin => <Coin key={coin.market} coin={coin}></Coin>)
      }
      </table>
    
     
     
    </div>
  )
}

export default Coins;
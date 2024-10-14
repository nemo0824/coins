import React, { useEffect, useState } from 'react'
import axios from 'axios';

interface CoinName{
  market:string;
  korean_name:string;
  english_name:string
}






const Coins = () => {
  const [coinName, setCoinName] = useState<string>("");
  useEffect(()=>{
    getCoinInitial()
    getCoinName()
    // console.log(prices)

    


  }, [])
  // 코인 이름 가져오기
  const getCoinName = ()=>{
    axios.get("https://api.bithumb.com/v1/market/all")
    .then(response => setCoinName(response.data.map((coin:CoinName) => coin.market)))
  }

  // 코인 초기 렌더링을 위해 첫 api 요청
  const getCoinInitial = () =>{  
    axios.get(`https://api.bithumb.com/v1/ticker?markets=${[...coinName]}`)
      .then(response => console.log("초기값",response.data))
      .catch(err => console.error(err));
  }
  console.log("coinName",coinName)
  
  return (
    <div className='flex justify-center items-center'>
      {/* <table>
        <tr className='bg-black text-white'>
          <th>코드</th>
          <th>한국이름</th>
          <th>영어이름</th>
        </tr>
      {
      prices?.slice(0,100).map( coin => <Coin key={coin.market} coin={coin}></Coin>)
      }
      </table> */}
    
     
     
    </div>
  )
}

export default Coins;
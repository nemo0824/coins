import React from 'react'


interface CoinPrice {
    tradePrice: number;
    accTradePrice24h: number;
    signedChangeRate: number;
    signedChangePrice: number;
    change: string;
    code: string;
  }


  

const CoinRow = ({ tradePrice, accTradePrice24h, signedChangeRate, signedChangePrice, change, code }:CoinPrice) => {

    const getChangeColor = () =>{
        if(change === "RISE") return 'text-red-500';
        if(change === "FALL") return 'text-blue-500';
        return 'text-white'
     }
  return (
    <tr key={code} className='text-[#FAFAF9] border-b-[1px] border-b-[rgb(41, 37, 36)]'> 
      <td className="py-3 px-2">
        {code}
      </td>
      <td className={`py-3 px-2 ${getChangeColor()}`}>
        {tradePrice.toLocaleString()} 원
      </td>
      <td className={`py-3 px-2 ${getChangeColor()}`}>
        {signedChangeRate > 0 
          ? `+${(signedChangeRate * 100).toFixed(2)}%` 
          : `${(signedChangeRate * 100).toFixed(2)}%`}
      </td>
      <td className="py-3 px-2">
        {Math.trunc(accTradePrice24h).toLocaleString()} 원
    </td>
    </tr>
  )
}

export default CoinRow
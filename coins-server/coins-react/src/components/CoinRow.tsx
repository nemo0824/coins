import React from 'react'
import { useNavigate } from 'react-router-dom';


interface CoinPrice {
    tradePrice: number;
    accTradePrice24h: number;
    signedChangeRate: number;
    signedChangePrice: number;
    change: string;
    code: string;
    displayName: string;
  }




const CoinRow = ({ tradePrice, accTradePrice24h, signedChangeRate,displayName, change, code }:CoinPrice) => {
    // change에 따른 색상 변경
    const getChangeColor = () =>{
        if(change === "RISE") return 'text-red-500';
        if(change === "FALL") return 'text-blue-500';
        return 'text-white'
     }

     const navigate = useNavigate()
    //  detail 페이지로 이동
     const handleRowClick = ()=>{
        navigate(`/coin/${code}`,{
           state: {displayName}
        })
     }
    //  min-w-[150px] max-w-[200px]
    //  min-w-[150px] max-w-[200px]
    //  min-w-[100px] max-w-[150px]
    //  min-w-[200px] max-w-[250px]
  return (
    
    <tr key={code} className='text-[#FAFAF9] border-b-[1px] border-b-[rgb(41, 37, 36)] w-full cursor-pointer hover:bg-slate-800' onClick={handleRowClick}> 
      <td className="py-3 px-2 w-[170px] truncate ">
        {displayName}
      </td>
      <td className={`py-3 px-2 w-[162.5px] whitespace-nowrap ${getChangeColor()}`}>
        {tradePrice.toLocaleString()} 원
      </td>
      <td className={`py-3 px-2 w-[105px] ${getChangeColor()}`}>
        {signedChangeRate > 0 
          ? `+${(signedChangeRate * 100).toFixed(2)}%` 
          : `${(signedChangeRate * 100).toFixed(2)}%`}
      </td>
      <td className="py-3 px-2 text-right w-[162.5px] truncate">
        {Math.trunc(accTradePrice24h).toLocaleString()} 원
    </td>
    </tr>
  )
}

export default CoinRow
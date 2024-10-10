import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Coins = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchMarketPrices = async () => {
      try {
        const response = await axios.get('/api/market-prices');
        setPrices(response.data); // 받아온 데이터로 상태 업데이트
      } catch (error) {
        console.error("Error fetching market prices:", error);
      }
    };

    fetchMarketPrices();

    // 2초마다 다시 호출 (옵션)
    const intervalId = setInterval(fetchMarketPrices, 2000);
    
    // 정리 함수 반환 (컴포넌트가 언마운트 될 때 인터벌 클리어)
    return () => clearInterval(intervalId);
  }, []); // 의존성 배열 비어 있음: 컴포넌트가 마운트 될 때만 실행

  return (
    <div>
      {prices}
    </div>
  )
}

export default Coins;
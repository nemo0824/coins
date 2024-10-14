import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface TickerPrice {
  closePrice: number;
  volume: number;
  highPrice: number;
  lowPrice: number;
  symbol: string;
}
interface ICoinName{
    market:string;
}

const Socket = () => {
  const [tickerData, setTickerData] = useState<TickerPrice[]>([]); // 초기값을 빈 배열로 설정
  const [coinName, setCoinName] = useState<string[]>([])
  useEffect(() => {

    
    // coin 이름 가져오기
      getCoinsName()
    


    // 소켓 연결 
    const socket = new WebSocket('wss://ws-api.bithumb.com/websocket/v1');

    // 구독메시지 작성
    const subscribeMessage = JSON.stringify([
      { "ticket": "test example" },
      { "type": "ticker", "codes": coinName },
      { "format": "DEFAULT" }
    ]);
    // 소켓으로 송신
    socket.onopen = () => {
      console.log('WebSocket 연결이 열렸습니다.');
      socket.send(subscribeMessage);
    };


    // 소켓으로 수신
    socket.onmessage = (event) => {
        // Blob 데이터를 텍스트로 변환
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          
          // result가 string인지 확인
          if (typeof result === 'string') {
            const data = JSON.parse(result); // 변환된 텍스트를 JSON으로 파싱
            console.log('수신된 데이터:', data);
  
            if (data && data.ty === 'ticker') {
              const newTicker: TickerPrice = {
                closePrice: data.tp,
                volume: data.tv,
                highPrice: data.hp,
                lowPrice: data.lp,
                symbol: data.cd,
              };
  
              setTickerData(prevData => {
                const existingIndex = prevData.findIndex(ticker => ticker.symbol === newTicker.symbol);
                if (existingIndex !== -1) {
                  const updatedData = [...prevData];
                  updatedData[existingIndex] = newTicker;
                  return updatedData;
                } else {
                  return [...prevData, newTicker];
                }
              });
            }
          } else {
            console.error('Received data is not a string:', result);
          }
        };
  
        reader.readAsText(event.data); // Blob 데이터를 텍스트로 읽기
      };
      

    socket.onerror = (error) => {
      console.error('WebSocket 오류:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket 연결이 닫혔습니다.');
    };

    return () => {
      socket.close();
    };
  }, []);


  const getCoinsName = () =>{
    axios.get<ICoinName[]>('https://api.bithumb.com/v1/market/all')
    .then(response => setCoinName(response.data.slice(0,100).map(coin=> coin.market)))
  }

  return (
    <div>
      {coinName.map(coin => (<p key={coin}>{coin}</p>))}
      
    </div>

  );
};

export default Socket; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface TickerPrice {
    tradePrice: number; // 현재가
    accTradePrice24h: number; // 24시간 거래대금
    signedChangeRate: number; // 부호가 있는 변화율
    signedChangePrice: number; // 부호가 있는 변화액
    change: string; // 변화 상태
    code: string;
   
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
    if (coinName.length === 0) return;
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
      
            if (data && data.type === 'ticker') {
              const newTicker: TickerPrice = {
                tradePrice: data.trade_price, // 현재가
                accTradePrice24h: data.acc_trade_price_24h, // 24시간 거래대금
                signedChangeRate: data.signed_change_rate, // 부호가 있는 변화율
                signedChangePrice: data.signed_change_price, // 부호가 있는 변화액
                change: data.change, // 변화 상태
                code: data.code, // 심볼
              };
      
              setTickerData(prevData => {
                const existingIndex = prevData.findIndex(ticker => ticker.code === newTicker.code);
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

  // 이름가져오기
  const getCoinsName = () =>{
    axios.get<ICoinName[]>('https://api.bithumb.com/v1/market/all')
    .then(response => setCoinName(response.data.slice(0,100).map(coin=> coin.market)))
  }


  const getCoinInitial = () =>{  
    axios.get(`https://api.bithumb.com/v1/ticker?markets=${[...coinName]}`)
      .then(response => console.log(response.data))
      .catch(err => console.error(err));
  }
  console.log("coinName",coinName)

  return (
    <div className='flex justify-center items-center'>
       <table>
    <thead>
      <tr>
        <th>이름</th>
        <th>현재가</th>
        <th>전일대비</th>
        <th>거래대금</th>
      </tr>
    </thead>
    <tbody>
      {tickerData.map((coin) => (
        <tr key={coin.code}> {/* 고유 키를 추가 */}
          <td>{coin.code}</td>
          <td>{coin.tradePrice.toLocaleString()} 원</td> {/* 현재가 포맷 */}
          <td>
            {coin.signedChangeRate > 0 
              ? `+${(coin.signedChangeRate * 100).toFixed(2)}%` 
              : `${(coin.signedChangeRate * 100).toFixed(2)}%`}
          </td>
          <td>{coin.accTradePrice24h.toLocaleString()} 원</td> {/* 거래대금 포맷 */}
        </tr>
      ))}
    </tbody>
  </table>
        
      
    </div>

  );
};

export default Socket; 
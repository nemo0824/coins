import React, { useEffect, useState } from 'react';

interface TickerPrice {
  closePrice: number;
  volume: number;
  highPrice: number;
  lowPrice: number;
  symbol: string;
}

const Socket = () => {
  const [tickerData, setTickerData] = useState<TickerPrice[]>([]); // 초기값을 빈 배열로 설정

  useEffect(() => {
    // 공식 Public WebSocket URL 사용
    const socket = new WebSocket('wss://ws-api.bithumb.com/websocket/v1');

    // 구독 메시지 형식 (공식 문서에 따라)
    const subscribeMessage = JSON.stringify([
      { "ticket": "test example" },
      { "type": "ticker", "codes": ["KRW-BTC", "KRW-ETH"] },
      { "format": "DEFAULT" }
    ]);

    socket.onopen = () => {
      console.log('WebSocket 연결이 열렸습니다.');
      socket.send(subscribeMessage);
    };

    socket.onmessage = (event) => {
        // Blob 데이터를 텍스트로 변환
        const reader = new FileReader();
        reader.onload = () => {
          const data = JSON.parse(reader.result); // 변환된 텍스트를 JSON으로 파싱
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

  return (
    <div>
      <h1>Bithumb 실시간 티커 데이터</h1>
      {tickerData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>심볼</th>
              <th>현재가</th>
              <th>거래량</th>
              <th>최고가</th>
              <th>최저가</th>
            </tr>
          </thead>
          <tbody>
            {tickerData.map(ticker => (
              <tr key={ticker.symbol}>
                <td>{ticker.symbol}</td>
                <td>{ticker.closePrice} KRW</td>
                <td>{ticker.volume}</td>
                <td>{ticker.highPrice}</td>
                <td>{ticker.lowPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default Socket;

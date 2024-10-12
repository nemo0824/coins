import React, { useEffect, useState } from 'react';

interface tickerPrice{
    closePrice:number;
    volume:number;
    highPrice:number;
    lowPrice:number;
}


const Socket = () => {
  const [tickerData, setTickerData] = useState<tickerPrice|null>(null);

  useEffect(() => {
    // Bithumb WebSocket URL
    const socket = new WebSocket('wss://pubwss.bithumb.com/pub/ws');
    
    // 웹소켓 연결 시 구독 메시지 전송
    const subscribeMessage = JSON.stringify({
      type: "ticker",
      symbols: ["BTC_KRW"], // 예시로 BTC/KRW 티커를 구독
      tickTypes: ["30M"]    // 30분 간격의 데이터 구독
    });

    // 웹소켓이 열릴 때 구독 요청 전송
    socket.onopen = () => {
      console.log('WebSocket 연결이 열렸습니다.');
      socket.send(subscribeMessage);
    };

    // 웹소켓을 통해 데이터가 수신되었을 때
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data && data.content) {
        console.log('수신된 데이터:', data);
        setTickerData(data.content); // 수신된 티커 데이터를 state에 저장
      }
    };

    // 웹소켓이 닫힐 때
    socket.onclose = () => {
      console.log('WebSocket 연결이 닫혔습니다.');
    };

    // 컴포넌트가 unmount될 때 웹소켓 연결 해제
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Bithumb 실시간 티커 데이터</h1>
      {tickerData ? (
        <div>
          <p>현재가: {tickerData.closePrice} KRW</p>
          <p>거래량: {tickerData.volume}</p>
          <p>최고가: {tickerData.highPrice}</p>
          <p>최저가: {tickerData.lowPrice}</p>
        </div>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default Socket;

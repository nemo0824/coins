import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoinRow from '../components/CoinRow';
import store from '../lib/store';
import { response } from 'express';
import { useSearchParams } from 'react-router-dom';
import useSearchState from '../lib/store';
import { HiChevronUpDown } from "react-icons/hi2";
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

interface ICoinNames{
  market:string;
  english_name:string;
  korean_name:string;
}

const Coins = () => {
  const [tickerData, setTickerData] = useState<TickerPrice[]>([]); // 초기값을 빈 배열로 설정
  const [coinName, setCoinName] = useState<string[]>([])
  const [coinNames, setCoinNames] = useState<ICoinNames[]>([])
  const [isKoreanName, setIsKoreanName] = useState(true);
  const [isPriceDes, setIsPriceDes] = useState(false);
  const [isDayDes, setIsDayDes] = useState(false)
  const [isDayTradeDes, setIsDayTradeDes] = useState(false)
  const {searchTerm} = store.useSearchState()
const setupWebSocket = ()=>{
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

// 중복되는거 확인*(****)

 // 소켓으로 수신
 socket.onmessage = (event) => {
     // Blob 데이터를 텍스트로 변환
     const reader = new FileReader();
     reader.onload = () => {
       const result = reader.result;
   
       // result가 string인지 확인
       if (typeof result === 'string') {
         const data = JSON.parse(result); // 변환된 텍스트를 JSON으로 파싱
        
   
         if (data && data.type === 'ticker') {
           const newTicker: TickerPrice = {
             tradePrice: data.trade_price, // 현재가
             accTradePrice24h: data.acc_trade_price_24h, // 24시간 거래대금
             signedChangeRate: data.signed_change_rate, // 부호가 있는 변화율
             signedChangePrice: data.signed_change_price, // 부호가 있는 변화액
             change: data.change, // 변화 상태
             code: data.code, // 심볼
           };
           if (newTicker.tradePrice > 1 && newTicker.accTradePrice24h > 0) {
            setTickerData((prevData) => {
              const existingIndex = prevData.findIndex((ticker) => ticker.code === newTicker.code);
              if (existingIndex !== -1) {
                const updatedData = [...prevData];
                updatedData[existingIndex] = newTicker;
                return updatedData;
              } else {
                return [...prevData, newTicker];
              }
            });
          }
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
}

  useEffect(()=>{
    const fetchData = async()=>{
        await getCoinsName() 
      }
    fetchData()
    getNameChange()
  },[])


  useEffect(() => {
    const fetchDataAndSetupSocket = async () => {
      if (coinName.length > 0) {
        await getCoinInitial();
        setupWebSocket(); // WebSocket 설정 함수 호출
      }
    };
    fetchDataAndSetupSocket();
  }, [coinName]);

  // 이름가져오기
  const getCoinsName = async() =>{
    axios.get<ICoinName[]>('https://api.bithumb.com/v1/market/all')
    .then(response => setCoinName(response.data.map(coin=> coin.market)))
  }


  // 첫 렌더링 이슈로 먼저 http api 통신을통해서 초기값가져오기
  const getCoinInitial = async() =>{  
    axios.get(`https://api.bithumb.com/v1/ticker?markets=${[...coinName]}`)
      .then(response => console.log("초기값",response.data))
      .catch(err => console.error(err));
  }
 
  const getNameChange = ()=>{
    axios.get('https://api.bithumb.com/v1/market/all')
    .then(response => setCoinNames(response.data))
    .catch(err => console.error(err));
  }
  //영문 이름 한글 이름
  const handleNameChange = () => {
    setIsKoreanName(prev => !prev); 
  }
  // 현재가 내림차순, 오름차순
  const handleSortPrice = ()=>{
    setTickerData(prev => { 
      const sortedData = [...prev].sort((a, b) => 
        isPriceDes ? a.tradePrice - b.tradePrice : b.tradePrice - a.tradePrice
      );
      return sortedData
    })
    setIsPriceDes(prev => !prev)
  }
  // 전일대비 내림차순 , 오름차순
  const handleSortDay = () =>{
    setTickerData(prev => {
      const sortedData = [...prev].sort((a,b)=> 
        isDayDes ? a.signedChangeRate - b.signedChangeRate : b.signedChangeRate - a.signedChangeRate
        
      )
      return sortedData
    })
    setIsDayDes(prev => !prev)
  }

    // 전일대비 내림차순 , 오름차순
    const handleTradePrice = () =>{
      setTickerData(prev => {
        const sortedData = [...prev].sort((a,b)=> 
          isDayTradeDes ? a.accTradePrice24h - b.accTradePrice24h : b.accTradePrice24h - a.accTradePrice24h
          
        )
        return sortedData
      })
      setIsDayTradeDes(prev => !prev)
    }

    // 이름과 원래 tickeData 결합하는  리팩토링 즉 새로운 객체 모든 코인정보를 담고있는
    const combinedData = tickerData.map(coin =>{
      const coinNameInfo = coinNames.find(v=> v.market === coin.code)
      return{
        ...coin,
        displayName: isKoreanName ? coinNameInfo?.korean_name : coinNameInfo?.english_name
      }
    })

    // 검색로직 분리 유지보수성을위해서
    const filteredData = searchTerm ? combinedData.filter(coin => coin.displayName?.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) : combinedData
    console.log(filteredData, "filteredData")
    const noResultsMessage = filteredData.length === 0 && searchTerm ? "검색 결과가 없습니다." : null;

  

  return (
    <div className='flex justify-center items-center bg-[#0A0A0B] w-full'>
     
       <table className='min-w-[600px] max-w-[650px] table-fixed  mt-3'>
        <thead>
       
          <tr className='text-[#FAFAF9] border border-t-white-300 bg-stone-800 whitespace-nowrap'>
            <th onClick={handleNameChange} className='cursor-pointer text-left py-3 px-2'>한/영 <HiChevronUpDown className='inline-block'/></th>
            <th onClick={handleSortPrice} className='cursor-pointer text-left py-3 px-2'>현재가 <HiChevronUpDown className='inline-block'/></th>
            <th onClick={handleSortDay} className='cursor-pointer text-left py-3 px-2'>전일대비 <HiChevronUpDown className='inline-block'/></th>
            <th onClick={handleTradePrice} className='cursor-pointer text-right py-3 px-2'>거래대금 <HiChevronUpDown className='inline-block'/></th>
          </tr>
        </thead>
        <tbody>
        {noResultsMessage && <h3 className='text-[#FAFAF9]'>{noResultsMessage}</h3>}
        {filteredData.map((coin) => {
                         console.log(coin.tradePrice)

                        return (
                            <CoinRow 
                                key={coin.code} 
                                {...coin}
                            />
                        );
                    })}
        </tbody>
        </table>
    </div>

  );
};

export default Coins; 
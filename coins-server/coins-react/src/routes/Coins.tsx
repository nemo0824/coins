import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoinRow from '../components/CoinRow';
import store from '../lib/store';
import { HiChevronUpDown } from "react-icons/hi2";

interface TickerPrice {
    tradePrice: number; // 현재가
    accTradePrice24h: number; // 24시간 거래대금
    signedChangeRate: number; // 부호가 있는 변화율
    signedChangePrice: number; // 부호가 있는 변화액
    change: string; // 변화 상태
    code: string;  
}

interface CoinResponse {
  trade_price: number;            // 현재가
  acc_trade_price_24h: number;    // 24시간 거래대금
  signed_change_rate: number;     // 부호가 있는 변화율
  signed_change_price: number;    // 부호가 있는 변화액
  change: string;                 // 변화 상태 (e.g., "RISE", "FALL")
  market: string;                 // 코인 마켓 코드 (e.g., "KRW-BTC")
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
  const [tickerData, setTickerData] = useState<TickerPrice[]>([]); 
  const [coinCodes, setCoinCodes] = useState<string[]>([])  // coinCodes (코인 초기값을 가져오기위해서) 
  const [coinNames, setCoinNames] = useState<ICoinNames[]>([]) // coinNames (한국이름, 영어이름 , codes)

  // 정렬 영역
  const [isKoreanName, setIsKoreanName] = useState(true); // 한/영 여부
  const [isPriceDes, setIsPriceDes] = useState(false); // 현재가 내림차순여부 
  const [isDayDes, setIsDayDes] = useState(false)// 전일대비 
  const [isDayTradeDes, setIsDayTradeDes] = useState(false) // 거래대금


  const {searchTerm} = store.useSearchState()
const setupWebSocket = ()=>{
 // 소켓 연결 
 const socket = new WebSocket('wss://ws-api.bithumb.com/websocket/v1');
 if (coinCodes.length === 0) return;
 // 구독메시지 작성
 const subscribeMessage = JSON.stringify([
   { "ticket": "test example" },
   { "type": "ticker", "codes": coinCodes },
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
        
   
         if (data && data.type === 'ticker') {
           const newTicker: TickerPrice = {
             tradePrice: data.trade_price, // 현재가
             accTradePrice24h: data.acc_trade_price_24h, // 24시간 거래대금
             signedChangeRate: data.signed_change_rate, // 부호가 있는 변화율
             signedChangePrice: data.signed_change_price, // 부호가 있는 변화액
             change: data.change, // 변화 상태
             code: data.code, // 심볼
           };
          //  coin으ㅣ 가격과 24시간 거래대금 오류방지
           if (newTicker.tradePrice > 1 && newTicker.accTradePrice24h > 0) {

            // 동일한 index찾아서  updateData에서 교체해주기
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
    // coin Code 가져오기
      getCoinCodes() 
    
    // 한/영/코드 이름 가져오기 바꾸기위해서
    getNameChange()
  },[])


  useEffect(() => {
    const fetchDataAndSetupSocket = async () => {
      // coinCode가 가져온후에 
      if (coinCodes.length > 0) {

        await getCoinInitial();
       

        setupWebSocket(); // WebSocket 설정 함수 호출
      }
    };
    fetchDataAndSetupSocket();
  }, [coinCodes]);

  // 초기 소켓 통신 이전에 coinCode 가져오기
  const getCoinCodes = async() =>{
    axios.get<ICoinName[]>('https://api.bithumb.com/v1/market/all')
    .then(response => setCoinCodes(response.data.map(coin=> coin.market)))
  }


  // 첫 렌더링 이슈로 먼저 http api 통신을통해서 초기값가져오기 getCoinCode을 통해서 
  const getCoinInitial = async() =>{  
    try {
      const response = await axios.get(`https://api.bithumb.com/v1/ticker?markets=${coinCodes.join(',')}`);
      // console.log("data",response.data)
   
      const initialData : TickerPrice[] = response.data.map((coin:CoinResponse)=>({
        tradePrice: coin.trade_price,             // 현재가
        accTradePrice24h: coin.acc_trade_price_24h, // 24시간 거래대금
        signedChangeRate: coin.signed_change_rate, // 부호가 있는 변화율
        signedChangePrice: coin.signed_change_price, // 부호가 있는 변화액
        change: coin.change,                              // 변화 상태
        code: coin.market,        
      }))

      // 거래대금, 현재가격 0 1 이상인것 (이상한값 제외 )
      const validCoin=  initialData.filter((coin)=> coin.tradePrice > 1 && coin.accTradePrice24h > 0)
      // console.log("initialData",initialData)
     
      // 초기 데이터를 상태에 반영
      setTickerData(validCoin);
      // console.log("처음에 화면 렌더링 쉽게해줌 사용자 경험 향상시켜줌")
    } catch (error) {
      console.error("Error fetching initial coin data:", error);
    }
    
  }
 
  const getNameChange = ()=>{
    axios.get('https://api.bithumb.com/v1/market/all')
    .then(response => setCoinNames(response.data))
    .catch(err => console.error(err));
  }

  // -----------------------------정렬 영역 ---------------------------------------------------
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
    // console.log(filteredData, "filteredData")
    const noResultsMessage = filteredData.length === 0 && searchTerm ? "검색 결과가 없습니다." : null;

  

  return (
    <div className='flex justify-center items-center bg-[#0A0A0B] w-full '>
     
       <table className='min-w-[600px] max-w-[650px] table-fixed  mt-3'>
        <thead>
       
          <tr className='text-[#FAFAF9] border border-t-white-300 bg-stone-800 whitespace-nowrap'>
            <th onClick={handleNameChange} className='cursor-pointer text-left py-3 px-2 w-[170px]'>한/영 <HiChevronUpDown className='inline-block'/></th>
            <th onClick={handleSortPrice} className='cursor-pointer text-left py-3 px-2 w-[162.5px]'>현재가 <HiChevronUpDown className='inline-block'/></th>
            <th onClick={handleSortDay} className='cursor-pointer text-left py-3 px-2 w-[105px]'>전일대비 <HiChevronUpDown className='inline-block'/></th>
            <th onClick={handleTradePrice} className='cursor-pointer text-right py-3 px-2 w-[162.5px]'>거래대금 <HiChevronUpDown className='inline-block'/></th>
          </tr>
        </thead>
        <tbody>
        {noResultsMessage && <h3 className='text-[#FAFAF9]'>{noResultsMessage}</h3>}
        {filteredData.map((coin) => {
                        //  console.log(coin.tradePrice)

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
const { render } = require('ejs')
const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const { MongoClient, ObjectId } = require('mongodb')
const axios = require('axios');  // axios 패키지 추가
const cors = require('cors');    // cors 패키지 추가

// 기본 설정
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))
app.use(cors()); // 클라이언트에서 요청을 허용하도록 설정

// 최대리스너 설정
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
myEmitter.setMaxListeners(20);

// MongoDB 연결 설정
let db;
const url = 'mongodb+srv://nemo0824:Dlawodnjs09080%40@nemo0824.fqklg.mongodb.net/?retryWrites=true&w=majority&appName=nemo0824'
new MongoClient(url).connect().then((client)=>{
  console.log('DB 연결 성공');
  db = client.db('forum');
  app.listen(8080, ()=>{
    console.log('http://localhost:8080 에서 서버 실행 중');
  });
}).catch((err)=>{
  console.log(err);
});

// 리액트 빌드 파일 연동
app.use(express.static(path.join(__dirname, 'coins-react/build')));

// React로 연동 설정
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'coins-react/build/index.html'))
});

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'coins-react/build/index.html'))
});



let marketPrices = []; // 현재가 정보를 저장할 배열

// 모든 마켓 코드 가져오기
const fetchAllMarkets = async () => {
    try {
        const response = await axios.get('https://api.bithumb.com/v1/market/all');
        return response.data.data; // 모든 마켓 코드 반환
    } catch (error) {
        console.error("Error fetching all markets:", error.response ? error.response.data : error.message);
        return []; // 에러 발생 시 빈 배열 반환
    }
};

// 현재가 정보 조회
const fetchCurrentPrices = async (markets) => {
    try {
        const response = await axios.get('https://api.bithumb.com/v1/ticker', {
            params: { markets: markets.join(',') },
        });
        marketPrices = response.data.data; // 현재가 정보 저장
    } catch (error) {
        console.error("Error fetching current prices:", error.response ? error.response.data : error.message);
    }
};

// 주기적으로 현재가 정보 업데이트
const updateMarketPrices = async () => {
    const allMarkets = await fetchAllMarkets(); // 모든 마켓 코드 가져오기
    const limitedMarkets = allMarkets.slice(0, 130); // 처음 130개 마켓 코드만 사용
    const marketCodes = limitedMarkets.map(market => market.market); // 마켓 코드 추출

    // 현재가 요청
    await fetchCurrentPrices(marketCodes);
};

// 일정 시간마다 현재가 정보를 갱신
setInterval(updateMarketPrices, 5000); // 5초마다 호출

// 클라이언트 요청 처리
app.get('/api/market-prices', (req, res) => {
    res.json(marketPrices); // 클라이언트에 현재가 정보 전송
});

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






let cachedMarkets = []; // 마켓 코드 캐시를 위한 변수

// 모든 마켓 코드 가져오기
const fetchAllMarkets = async () => {
    // 캐시에 마켓 코드가 없다면 API 호출
    if (cachedMarkets.length === 0) {
        try {
            const response = await axios.get('https://api.bithumb.com/v1/market/all');
            cachedMarkets = response.data.data.slice(0, 130); // 처음 130개 마켓만 저장
        } catch (error) {
            console.error("Error fetching all markets:", error.response ? error.response.data : error.message);
            return []; // 에러 발생 시 빈 배열 반환
        }
    }
    return cachedMarkets; // 캐시된 마켓 코드 반환
};

// // 현재가 정보 조회
// const fetchCurrentPrices = async (marketCodes) => {
//     try {
//         const response = await axios.get('https://api.bithumb.com/v1/ticker', {
//             params: { markets: marketCodes.join(',') }, // 배열을 문자열로 변환
//         });
//         return response.data; // 현재가 정보 반환
//     } catch (error) {
//         console.error("Error fetching current prices:", error.response ? error.response.data : error.message);
//         return null; // 에러 발생 시 null 반환
//     }
// };

// // 마켓 코드와 현재가 정보를 가져오는 엔드포인트
// app.get('/api/market-prices', async (req, res) => {
//     // 이미 캐시된 마켓 코드 사용
//     await fetchAllMarkets(); // 캐시가 비어 있으면 한 번만 호출

//     if (!cachedMarkets.length) {
//         return res.status(404).json({ error: "마켓 코드가 없습니다." });
//     }

//     const marketCodes = cachedMarkets.map(market => market.market); // 마켓 코드 추출
//     const currentPrices = await fetchCurrentPrices(marketCodes); // 모든 마켓에 대해 현재가 조회

//     if (currentPrices) {
//         return res.json(currentPrices); // 클라이언트에 데이터 전송
//     } else {
//         return res.status(500).json({ error: "현재가 정보를 가져오는데 실패했습니다." });
//     }
// });

// // 주기적으로 현재가 정보 조회
// const requestCurrentPricesInBatches = async () => {
//     // 만약 cachedMarkets가 비어있다면, 마켓 코드를 가져옴
//     await fetchAllMarkets(); // 캐시가 비어 있으면 한 번만 호출

//     // 캐시된 마켓 코드가 존재하면 사용
//     const marketCodes = cachedMarkets.map(market => market.market); // 캐시된 마켓 코드 추출

//     // 주기적으로 현재가 요청
//     setInterval(async () => {
//         const currentPrices = await fetchCurrentPrices(marketCodes); // 현재가 조회
//         if (currentPrices) {
//             console.log(currentPrices); // 현재가 정보 출력 (여기서 프론트엔드로 전송할 수도 있음)
//         }
//     }, 2000); // 2초마다 요청
// };

// requestCurrentPricesInBatches();
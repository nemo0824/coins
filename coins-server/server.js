require('dotenv').config();
const { render } = require('ejs')
const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const { MongoClient, ObjectId } = require('mongodb')
const axios = require('axios');  // axios 패키지 추가
const cors = require('cors');    // cors 패키지 추가
const { userInfo } = require('os');


// 기본 설정
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))
app.use(cors()); // 클라이언트에서 요청을 허용하도록 설정
app.use(express.json())




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

// 
app.use(cors({
  origin: 'http://localhost:3000',  // React 앱이 실행 중인 도메인 허용
  methods: ['GET', 'POST'],
}));

// 카카오 로그인 url 주기
app.get('/api/auth/kakao-login', (req, res) => {
  const REST_API_KEY = process.env.KAKAO_REST_API_KEY; // 환경 변수에서 불러옴
  const REDIRECT_URI = 'http://localhost:3000/redirect';
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image`;

  res.json({ kakaoAuthUrl });
});


app.post('/api/auth/kakao-token', async (req, res) => {
  const { code } = req.body;

  try {
    const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
    const REDIRECT_URI = 'http://localhost:3000/redirect';

    // 액세스 토큰 요청
    const response = await axios.post(`https://kauth.kakao.com/oauth/token`, null, {
      params: {
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: code,
      },
    });

    const accessToken = response.data.access_token;
    res.json({ accessToken });
  } catch (error) {
    console.error('Kakao 로그인 처리 중 오류 발생:', error);
    res.status(500).json({ error: '로그인 처리 중 오류가 발생했습니다.' });
  }
});

app.post('/api/auth/kakao-user', async (req, res) => {
  const { accessToken } = req.body;

  try {
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo = response.data;
    console.log('kakao 유저정보', userInfo);
    const nickname = userInfo.properties?.nickname || userInfo.kakao_account?.profile?.nickname;
    const profileImage = userInfo.properties?.profile_image || userInfo.kakao_account?.profile?.profile_image_url;

    res.json({ nickname, profileImage, userInfo });
  } catch (error) {
    console.error('Kakao 사용자 정보 요청 중 오류 발생:', error);
    res.status(500).json({ error: '사용자 정보 요청 중 오류가 발생했습니다.' });
  }
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













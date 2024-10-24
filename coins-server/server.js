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

require('dotenv').config();

// 
app.get('/api/auth/kakao-login', (req, res) => {
  const REST_API_KEY = process.env.KAKAO_REST_API_KEY; // 환경 변수에서 불러옴
  const REDIRECT_URI = 'http://localhost:3000/';
  
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  res.json({ kakaoAuthUrl });
});








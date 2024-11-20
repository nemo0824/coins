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





// MongoDB 연결 설정
// let db;
// const url = 'mongodb+srv://nemo0824:Dlawodnjs09080%40@nemo0824.fqklg.mongodb.net/?retryWrites=true&w=majority&appName=nemo0824'
// new MongoClient(url).connect().then((client)=>{
//   console.log('DB 연결 성공');
//   db = client.db('forum');
//   app.listen(8080, ()=>{
//     console.log('http://localhost:8080 에서 서버 실행 중');
//   });
// }).catch((err)=>{
//   console.log(err);
// });

const PORT = 8080;

let db;
let client;

async function startServer() {
  try {
    // MongoDB 연결
    client = new MongoClient('mongodb+srv://nemo0824:Dlawodnjs09080%40@nemo0824.fqklg.mongodb.net/?retryWrites=true&w=majority&appName=nemo0824');
    await client.connect();
    db = client.db('forum');

    // 서버 실행
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT} 에서 서버 실행 중`);
    });
  } catch (err) {
    console.error('서버 시작 중 오류 발생:', err);
  }
}

startServer();

// 서버 종료 시 MongoDB 연결 종료
process.on('SIGINT', async () => {
  console.log('서버 종료 중...');
  await client.close(); // MongoDB 연결 종료
  process.exit(0);
});



// Cors 설정 미들웨어 사용 localhost:5173에서만 호출할수있도록
app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST'],
}));
app.use(express.json())
// 카카오 로그인 URL 프론트 단에서 주소를 전달하면 보안성이 떨어지기때문에 express에서 env파일을 통해서 URL전달
app.get('/api/auth/kakao-login', (req, res) => {
  const REST_API_KEY = process.env.KAKAO_REST_API_KEY; 
  const REDIRECT_URI = 'http://localhost:5173/redirect';
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image`;

  res.json({ kakaoAuthUrl });
});

// 프론트단에서 받아온 accCode로 token 요청
// app.post('/api/auth/kakao-token', async (req, res) => {
//   const { code } = req.body;

//   try {
//     const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
//     const REDIRECT_URI = 'http://localhost:5173/redirect';

//     // 액세스 토큰 요청
//     const response = await axios.post(`https://kauth.kakao.com/oauth/token`, null, {
//       params: {
//         grant_type: 'authorization_code',
//         client_id: REST_API_KEY,
//         redirect_uri: REDIRECT_URI,
//         code: code,
//       },
//     });

//     const accessToken = response.data.access_token;
//     res.json({ accessToken });
//   } catch (error) {
//     console.error('토큰 요청 중 오류 발생:', error.response ? error.response.data : error.message);
//     res.status(500).json({ error: '로그인 처리 중 오류가 발생했습니다.' });
//   }
// });

app.post('/api/auth/kakao-token', async (req, res) => {
  const { code } = req.body;

  try {
    const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
    const REDIRECT_URI = 'http://localhost:5173/redirect';

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
    console.error('토큰 요청 중 오류 발생:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: '로그인 처리 중 오류가 발생했습니다.' });
  }
});


// 받아온 카카오유저 정보 전달
app.post('/api/auth/kakao-user', async (req, res) => {
  const { accessToken } = req.body;

  try {
    // Bearer 토큰방식 으로 엑세스토큰 전달
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

// 게시글 리스트 조회
app.get('/api/posts', async (req, res)=>{
  try{
   const posts = await db.collection('post').find().toArray();
    res.json(posts);
  }catch(error){
    console.error('게시글 조회 오류', error);
    res.status(500).json({message: '게시글 조회 실패'})
  }
})

// 게시글 작성
app.post('/api/posts', async (req, res) => {
  try {
    
    const { title, category, author, content, profileImage } = req.body;

    const newPost = {
      title,
      category,
      author,
      content,
      profileImage,
      createdAt: new Date(),
    };

    // MongoDB에 데이터 추가
    const result = await db.collection('post').insertOne(newPost);

    res.status(201).json({
      message: '게시글 작성 성공'
    });
  } catch (error) {
    console.error('게시글 작성 오류:', error);
    res.status(500).json({ message: '게시글 작성 실패' });
  }
});

// 게시글 수정
app.put('/api/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, category, content, author } = req.body;

    // 해당 게시글을 찾아서 업데이트
    const result = await db.collection('post').updateOne(
      { _id: new ObjectId(postId)}, // author와 일치하는 경우에만 수정
      { $set: { title, category, content, updatedAt: new Date() } }
    );

    console.log('Updating post with ID:', postId);
console.log('Request body:', req.body);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: '게시글이 없거나 수정 권한이 없습니다.' });
    }

    res.status(200).json({ message: '게시글 수정 성공' });
  } catch (error) {
    console.error('게시글 수정 오류:', error);
    res.status(500).json({ message: '게시글 수정 실패' });
  }
});




// 게시글 삭제
app.delete('/api/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    

    const result = await db.collection('post').deleteOne({
      _id: new ObjectId(postId),
    
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: '게시글이 없거나 삭제 권한이 없습니다.' });
    }

    res.status(200).json({ message: '게시글 삭제 성공' });
  } catch (error) {
    console.error('게시글 삭제 오류:', error);
    res.status(500).json({ message: '게시글 삭제 실패' });
  }
});

// 댓글 작성
app.post('/api/comments', async (req, res) => {
  try {
    const { postId, author, content } = req.body;

    const newComment = {
      postId,
      author,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // MongoDB에 데이터 추가
    await db.collection('comment').insertOne(newComment);

    res.status(201).json({ message: '댓글 작성 성공' });
  } catch (error) {
    console.error('댓글 작성 오류:', error);
    res.status(500).json({ message: '댓글 작성 실패' });
  }
});


// 특정 게시글의 댓글 조회
app.get('/api/comments/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await db.collection('comment').find({ postId }).toArray();
    res.json(comments);
  } catch (error) {
    console.error('댓글 조회 오류:', error);
    res.status(500).json({ message: '댓글 조회 실패' });
  }
});



// 댓글 삭제
app.delete('/api/comments/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;  // URL에서 받은 commentId

    // commentId가 ObjectId로 변환 가능한지 확인하고 변환
    if (!ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: '유효하지 않은 댓글 ID' });
    }

    const result = await db.collection('comment').deleteOne({
      _id: new ObjectId(commentId)  // commentId만으로 삭제
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: '댓글이 없거나 삭제 권한이 없습니다.' });
    }

    res.status(200).json({ message: '댓글 삭제 성공' });
  } catch (error) {
    console.error('댓글 삭제 오류:', error);
    res.status(500).json({ message: '댓글 삭제 실패' });
  }
});


// 댓글 수정
app.put('/api/comments/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    // 댓글 ID가 유효한지 확인
    if (!ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: '유효하지 않은 댓글 ID' });
    }

    // 댓글 내용이 비어있는지 확인
    if (!content) {
      return res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
    }

    // 댓글 수정
    const result = await db.collection('comment').updateOne(
      { _id: new ObjectId(commentId) }, // 수정할 댓글 찾기
      { $set: { content, updatedAt: new Date() } } // 수정할 데이터
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: '댓글이 없거나 수정 권한이 없습니다.' });
    }

    res.status(200).json({ message: '댓글 수정 성공' });
  } catch (error) {
    console.error('댓글 수정 오류:', error);
    res.status(500).json({ message: '댓글 수정 실패' });
  }
});



function add(a, b) {
  return a + b;
}

module.exports = { add };






// 리액트 빌드 파일 연동
app.use(express.static(path.join(__dirname, 'coins-react/build')));

// React로 연동 설정
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'coins-react/build/index.html'))
});

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'coins-react/build/index.html'))
});













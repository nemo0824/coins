const { render } = require('ejs')
const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const { MongoClient, ObjectId } = require('mongodb')
const { redirect } = require('react-router-dom')

app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))


let db
const url = 'mongodb+srv://nemo0824:Dlawodnjs09080%40@nemo0824.fqklg.mongodb.net/?retryWrites=true&w=majority&appName=nemo0824'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum')
  app.listen(8080, ()=>{
    console.log('http://localhost:8080 에서 서버 실행중')
})
}).catch((err)=>{
  console.log(err)
})
// 리액트 빌드로 진입
app.use(express.static(path.join(__dirname, 'coins-react/build')))

// 리액트 와 연동
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'coins-react/build/index.html'))
})

// 라우팅을 리액트로 사용
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'coins-react/build/index.html'))
})

app.get('/', (req, res)=>{
    res.send('연동됨')
})
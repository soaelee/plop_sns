const express = require('express');
const postRouter = require('./routes/post');
const db = require('./models');
const app = express();

db.sequelize.sync()
  .then(() => {
    console.log('🐹db🚀');
  })
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('🐶메롱');
})

app.get('/api', (req, res) => {
  res.send('hello api');
})

app.get('/api/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello'},
    { id: 2, content: 'hello2'},
    { id: 3, content: 'hello3'},
  ])
})

app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('🐶server🚀');
})

// app.get => 게시글이나 사용자 정보 가져오기
// app.post => 생성
// app.put => 전체수정
// app.delete => 제거
// app.patch => 부분수정
// app.options => 찔러보기

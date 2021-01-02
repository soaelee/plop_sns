const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');
const db = require('./models');
const passportConfig = require('./passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const app = express();

db.sequelize.sync()
  .then(() => {
    console.log('🐹db🚀');
  })
  .catch((err) => console.log(err));

passportConfig();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, //나중에 true로
}));
app.use(morgan('dev'));

// app.use(cors({
//   origin: 'https://plop.jjagu.com'
// }))
// req.json과 form submit(form == urlencoded)

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/', (req, res) => {
  res.send('🐶메롱');
}) 

app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/posts', postsRouter);
app.listen(3065, () => {
  console.log('🐶server🚀');
})

// app.get => 게시글이나 사용자 정보 가져오기
// app.post => 생성
// app.put => 전체수정
// app.delete => 제거
// app.patch => 부분수정
// app.options => 찔러보기

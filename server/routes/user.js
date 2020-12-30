const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Post } = require('../models');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

//middleware 확장
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err){
      console.error(err);
      return next(err);
    }
    if(info){
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if(loginErr){
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: {id: user.id},
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
        }, {
          model: User,
          as: 'Followings',
        }, {
          model: User,
          as: 'Followers',
        }]
      })
      return res.status(200).json(fullUserWithoutPassword);
    })
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  return res.send('ok');
})

router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    })
    if(exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });

    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060')
    res.status(200).send('ok');
  }
  catch (err) {
    console.log(err);
    next(err); //status 500
  }
})
module.exports = router;

//200(201) 성공(유의미) 300 리다이렉트 400 클라이언트 에러 500 서버 에러

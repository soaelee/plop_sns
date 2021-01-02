const express = require('express');
const { Post, Image, Comment, User } = require('../models');
const router = express.Router();
const { isLoggedIn } = require('./middlewares');

router.post('/', isLoggedIn, async(req, res, next) => { // POST /post
  try{
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: {id: post.id},
      include: [{
        model: Image,
      }, {
        model: Comment,
        attributes: ['id', 'nickname'],
      }, {
        model: User,
        attributes: ['id', 'nickname'],s
      }]
    })
    res.status(201).json(fullPost);
  } catch(err){
    console.error(err);
    next(err);
  }
})

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /post/1/comment
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    })
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    })
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/', (req, res) => { // DELETE /post
  res.json({ id: 1 })
})

module.exports = router;
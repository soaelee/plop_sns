const express = require('express');

const { Post, Image, User, Comment } = require('../models');

const router = express.Router();

router.get('/', async(req, res, next) => { //GET /posts
  try{
    const posts = await Post.findAll({
      // where: {id: lastId},
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      }] 
    });
    console.log(posts);
    return res.status(200).json(posts);
  }catch(err){
    console.error(err);
    next(err);
  }
});

module.exports = router;


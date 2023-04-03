const express = require('express');
const router = express.Router();
const posts = require('../data/posts.json');

router.get('/', (req, res) => {
  res.render('index', { title: 'Blog Home', posts: posts });
});


module.exports = router;

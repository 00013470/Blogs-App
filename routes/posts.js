const express = require('express');
const router = express.Router();
const fs = require('fs');

// Helper function to read data from the posts.json file
function readData() {
  const rawData = fs.readFileSync('./data/posts.json');
  const data = JSON.parse(rawData);
  return data;
}

// Helper function to write data to the posts.json file
function writeData(data) {
  const newData = JSON.stringify(data, null, 2);
  fs.writeFileSync('./data/posts.json', newData);
}

// GET all posts
router.get('/', (req, res) => {
  const posts = readData();
  res.render('posts/index', { posts });
});

// GET new post form
router.get('/new', (req, res) => {
  res.render('posts/new');
});

// POST new post
router.post('/', (req, res) => {
  const posts = readData();
  const newPost = {
    id: Date.now().toString(),
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    createdAt: new Date()
  };
  posts.push(newPost);
  writeData(posts);
  res.redirect('/posts');
});

// GET edit post form
router.get('/:id/edit', (req, res) => {
  const posts = readData();
  const post = posts.find(p => p.id === req.params.id);
  res.render('posts/edit', { post });
});

// PUT update post
router.put('/:id', (req, res) => {
  const posts = readData();
  const post = posts.find(p => p.id === req.params.id);
  post.title = req.body.title;
  post.author = req.body.author,
  post.content = req.body.content;
  writeData(posts);
  res.redirect('/posts');
});




module.exports = router;



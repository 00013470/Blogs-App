const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// set the view engine to use pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// define routes
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');

app.use('/', indexRouter);
app.use('/posts', postsRouter);

app.get('/:id/delete', (req, res) => {
  const id = req.params.id

  fs.readFile('./data/posts.json', (err, data) => {

    if (err) throw err

    const posts = JSON.parse(data)

    const filteredPosts = posts.filter( post => post.id != id)

    fs.writeFile('./data/posts.json', JSON.stringify(filteredPosts), (err) => {
      if (err) throw err

      res.redirect('/posts');
    })
  })

  
})

// start the server
app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`);
});


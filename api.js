const express = require('express');
const morgan = require('morgan');
const games = require('./games.js');

const app = express();

app.use(morgan('dev'))
app.get('/', (req, res) =>{
  res.send('Hello!')
})

app.get('/apps', (req, res) => {
  console.log('req.query ', req.query)
  const {genre, sort} = req.query;
  let data = games;

  if (genre) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
    return res.status(400).json({ message: "Genre must be Action, Puzzle, Strategy, Casual, Arcade, or Card" })
    }
  }

  if (genre) {
    data = data.filter(obj => obj.Genres.toLowerCase().includes(genre.toLowerCase()))
  }

  if (sort) {
    if (!['Rating', 'App'].includes(sort)){
      return res.status(400).json('Sort must be Rating or App.')
    }
  }

  if (sort) {
    data.sort((currentApp, nextApp) => {
      return currentApp[sort] > nextApp[sort] ? 1 : currentApp[sort] < nextApp[sort] ? -1 : 0;
    })
  }

  res.status(200).json(data);
})

module.exports = app;
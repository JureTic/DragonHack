const express = require('express')
const path = require('path')
const Sentiment = require('sentiment')

const port = 3000
const app = express()

const cocktails = require('./cocktails.js')

function rand(min, max) {
  return min + Math.floor(Math.random() * max);
}

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/cocktail', function(req, res) {
  const sentiment = new Sentiment()
  const text = req.query.text
  const score = sentiment.analyze(text)

  var cocktail = null
  let prob = rand(0, score * 2);
  if (prob < 1) {
    cocktail = cocktails.neutral[rand(0, cocktails.neutral.length)];
  }
  else {
    if (score > 3) {
      let prob = rand(0, score);
      if (prob < 1) {
        cocktail = cocktails.good[rand(0, cocktails.good.length)];  
      }
      else {
        cocktail = cocktails.happy[rand(0, cocktails.happy.length)];
      }
    }
    else if (score >= 0) {
      cocktail = cocktails.good[rand(0, cocktails.good.length)];
    }
    else if (score < 3) {
      let prob = rand(0, score);
      if (prob < 1) {
        cocktail = cocktails.good[rand(0, cocktails.good.length)];
      }
      else {
        cocktail = cocktails.good[rand(0, cocktails.angry.length)];
      }
    }
    else {
      cocktail = cocktails.good[rand(0, cocktails.bad.length)];
    }
  }

  if (cocktail == null) {
    cocktail = cocktails.neutral[rand(0, cocktails.neutral.length)];
  }
  res.send(cocktail)
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
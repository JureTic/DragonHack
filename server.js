const express = require('express')
const path = require('path')
const Sentiment = require('sentiment')

let port = process.env.PORT
if (!port) {
  port = 3000
}
const app = express()

const cocktails = require('./cocktails.js')

function rand(min, max) {
  return min + Math.floor(Math.random() * max);
}

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/recept', function(req, res) {
  res.sendFile(path.join(__dirname, 'recept.html'))
})

function get_cocktail(score) {
  var cocktail = null;

  if (score == 0) {
    return cocktails.neutral[rand(0, cocktails.neutral.length)];
  }

  let prob = rand(0, Math.abs(score) * 5);
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
    else if (score < -3) {
      let prob = rand(0, score);
      if (prob < 1) {
        cocktail = cocktails.bad[rand(0, cocktails.bad.length)];
      }
      else {
        cocktail = cocktails.angry[rand(0, cocktails.angry.length)];
      }
    }
    else {
      cocktail = cocktails.bad[rand(0, cocktails.bad.length)];
    }
  }

  if (cocktail == null) {
    cocktail = cocktails.neutral[rand(0, cocktails.neutral.length)];
  }

  return cocktail;
}

function get_emotion(score) {
  if (score < -3) return "Angry";
  else if (score < 0) return "Sad";
  else if (score == 0) return "Neutral";
  else if (score < 3) return "Good";
  else return "Happy";
}

app.get('/cocktail', function(req, res) {
  const sentiment = new Sentiment()
  const text = req.query.text
  const score = sentiment.analyze(text)
  let choices = [];
  while (choices.length < 3) {
    console.log(score)

    let cocktail = get_cocktail(score.score);

    // if (choices.findIndex(function (element){
    //   return element.idDrink === cocktail.idDrink;
    // }) === -1) {
    choices.push(cocktail);
    // }
  }

  res.send({
    emotion: get_emotion(score.score),
    cocktails: choices 
  });
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
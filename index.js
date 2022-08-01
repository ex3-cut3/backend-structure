const express = require("express");
const knex = require("knex");
const jwt = require("jsonwebtoken");
const joi = require('joi');
const database = require('./db');
const appConfig = require('./config/app');
const errorHandler = require('./app/error/error.handler');

const dbConfig = require("./knexfile");
const app = express();
app.use(express.json());

const systemRoutes = require('./routes/system');
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transaction');
const eventsRoutes = require('./routes/events');

app.use(systemRoutes);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/events', eventsRoutes);

var port = 3000;

var db;

app.use((uselessRequest, uselessResponse, neededNext) => {
  db = database;
  db.raw('select 1+1 as result').then(function () {
    neededNext();
  }).catch(() => {
    throw new Error('No db connection');
  });
});

app.post("/bets", (req, res) => {
  var schema = joi.object({
    id: joi.string().uuid(),
    eventId: joi.string().uuid().required(),
    betAmount: joi.number().min(1).required(),
    prediction: joi.string().valid('w1', 'w2', 'x').required(),
  }).required();
  var isValidResult = schema.validate(req.body);
  if(isValidResult.error) {
    res.status(400).send({ error: isValidResult.error.details[0].message });
    return;
  };
  
  let userId;
  try {
    let token = req.headers['authorization'];
    if(!token) {
      return res.status(401).send({ error: 'Not Authorized' });
    }
    token = token.replace('Bearer ', '');
    try {
      var tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
      userId = tokenPayload.id;
    } catch (err) {
      console.log(err);
      return res.status(401).send({ error: 'Not Authorized' });
    }


    req.body.event_id = req.body.eventId;
    req.body.bet_amount = req.body.betAmount;
    delete req.body.eventId;
    delete req.body.betAmount;
    req.body.user_id = userId;
    db.select().table('user').then((users) => {
      var user = users.find(u => u.id == userId);
      if(!user) {
        res.status(400).send({ error: 'User does not exist'});
        return;
      }
      if(+user.balance < +req.body.bet_amount) {
        return res.status(400).send({ error: 'Not enough balance' });
      }
      db('event').where('id', req.body.event_id).then(([event]) => {
        if(!event) {
          return res.status(404).send({ error: 'Event not found' });
        }
        db('odds').where('id', event.odds_id).then(([odds]) => {
          if(!odds) {
            return res.status(404).send({ error: 'Odds not found' });
          }
          let multiplier;
          switch(req.body.prediction) {
            case 'w1':
              multiplier = odds.home_win;
              break;
            case 'w2':
              multiplier = odds.away_win;
              break;
            case 'x':
              multiplier = odds.draw;
              break;
          }
          db("bet").insert({
            ...req.body,
            multiplier,
            event_id: event.id
          }).returning("*").then(([bet]) => {
            var currentBalance = user.balance - req.body.bet_amount;
            db('user').where('id', userId).update({
              balance: currentBalance,
            }).then(() => {
              ['bet_amount', 'event_id', 'away_team', 'home_team', 'odds_id', 'start_at', 'updated_at', 'created_at', 'user_id'].forEach(whatakey => {
                var index = whatakey.indexOf('_');
                var newKey = whatakey.replace('_', '');
                newKey = newKey.split('')
                newKey[index] = newKey[index].toUpperCase();
                newKey = newKey.join('');
                bet[newKey] = bet[whatakey];
                delete bet[whatakey];
              });
              return res.send({ 
                ...bet,
                currentBalance: currentBalance,
              });
            });
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
    return;
  }
});

app.put("/events/:id", (req, res) => {
  var schema = joi.object({
    score: joi.string().required(),
  }).required();
  var isValidResult = schema.validate(req.body);
  if(isValidResult.error) {
    res.status(400).send({ error: isValidResult.error.details[0].message });
    return;
  };
  
  try {
    let token = req.headers['authorization'];
    if(!token) {
      return res.status(401).send({ error: 'Not Authorized' });
    }
    token = token.replace('Bearer ', '');
    try {
      var tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
      if (tokenPayload.type != 'admin') {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
      return res.status(401).send({ error: 'Not Authorized' });
    }


    var eventId = req.params.id;
    console.log(eventId);
    db('bet').where('event_id', eventId).andWhere('win', null).then((bets) => {
      var [w1, w2] = req.body.score.split(":");
      let result;
      if(+w1 > +w2) {
        result = 'w1'
      } else if(+w2 > +w1) {
        result = 'w2';
      } else {
        result = 'x';
      }
      db('event').where('id', eventId).update({ score: req.body.score }).returning('*').then(([event]) => {
        Promise.all(bets.map((bet) => {
          if(bet.prediction == result) {
            db('bet').where('id', bet.id).update({
              win: true
            });
            db('user').where('id', bet.user_id).then(([user]) => {
              return db('user').where('id', bet.user_id).update({
                balance: user.balance + (bet.bet_amount * bet.multiplier),
              });
            });
          } else if(bet.prediction != result) {
            return db('bet').where('id', bet.id).update({
              win: false
            });
          }
        }));
        setTimeout(() => {
          ['bet_amount', 'event_id', 'away_team', 'home_team', 'odds_id', 'start_at', 'updated_at', 'created_at'].forEach(whatakey => {
            var index = whatakey.indexOf('_');
            var newKey = whatakey.replace('_', '');
            newKey = newKey.split('')
            newKey[index] = newKey[index].toUpperCase();
            newKey = newKey.join('');
            event[newKey] = event[whatakey];
            delete event[whatakey];
          });
          res.send(event);
        }, 1000)
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
    return;
  }
});

app.use(errorHandler);

app.listen(appConfig.PORT, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// Do not change this line
module.exports = { app };
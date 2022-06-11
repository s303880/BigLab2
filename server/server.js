'use strict';

const Routes = require('./routes/Routes')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const USERDAO = require('./modules/Userdao');
const db = require('./modules/DB');
const userDao = new USERDAO(db.db);



const PORT = 3001;
const app = new express();
app.use(express.json());
app.use(morgan('dev'));
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
app.use(cors(corsOptions));



// Passport: set up local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const user = await userDao.getUser(username, password)
    if(!user)
      return cb(null, false, 'Incorrect username or password.');
      
    return cb(null, user);
  }));
  
passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  
passport.deserializeUser(function (user, cb) { // this user is id + email + name
    return cb(null, user);
    // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
  });

  
app.use(session({
    secret: "shhhhh... it's a secret!",
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.authenticate('session'));  

app.post('/api/sessions', function(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err)
        return next(err);
        if (!user) {
          // display wrong login messages
          return res.status(401).send(info);
        }
        // success, perform the login
        req.login(user, (err) => {
          if (err)
            return next(err);
          
          // req.user contains the authenticated user, we send all the user info back
          return res.status(201).json(req.user);
        });
    })(req, res, next);
  });


  // GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
    if(req.isAuthenticated()) {
      res.json(req.user);}
    else
      res.status(401).json({error: 'Not authenticated'});
  });
  
  // DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
    req.logout(() => {
      res.end();
    });
  });




app.use('', Routes)

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));

module.exports = app;
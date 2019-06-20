// libs
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

// modules
const SECRET_KEY = 'vuex-with-token';
const passport = require('./passport.js');
const UserModel = require('./models/UserModel.js');

// utils
function log() {
  [...arguments].forEach(val => console.log(chalk.cyan(val)));
}

// mongo db
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose.connect('mongodb://test:test1234@ds019038.mlab.com:19038/vue-shop', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// server setup
let port;
async function configServer() {
  port = 3000 || await detectPort(3000);
}
configServer();

// express setup
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); // log request

// router
app.post('/login', (req, res) => {
  // find the user
  UserModel.findOne({
    username: req.body.username,
  })
  .then(user => {
    // non registered user
    if (!user) {
      res.status(401).send('Authentication failed. User not found.');
    }
    bcrypt.compare(req.body.password, user.password, (error, result) => {      
      if (error) {
        res.status(500).send('Internal Server Error');
      }
      if (result) {
        // create token with user info
        const payload = {
          username: user.username,
          _id: user._id,
        };        
        const token = jwt.sign(payload, SECRET_KEY);
        // return the information including token as JSON
        const loggedInUser = {
          username: user.username,
          nickname: user.nickname,
        };
        res.status(200).json({
          success: true,
          user: loggedInUser,
          message: 'Login Success',
          token: token
        });
      } else {
        res.status(401).json('Authentication failed. Wrong password.');
      }
    });
  })
  .catch(error => {
    res.status(500).json('Internal Server Error');
    throw error;
  });
});

app.post('/signup', (req, res) => {
  const { username, password, nickname } = req.body;
  // encrypt password
  // NOTE: 10 is saltround which is a cost factor
  bcrypt.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      return res.status(500).json({ error });
    } else {
      const newUser = new UserModel({
        username,
        password: hashedPassword,
        nickname
      });
      newUser.save((error, saved) => {
        if (error) {
          console.log(error);
        } else {
          console.log(saved);
          res.send(saved);
        }
      });
    }
  });
});

// start
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
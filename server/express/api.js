const express = require('express');
const api = express();
const cors = require('cors');
const apiRouter = require('./routes/apiRouter');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/errorMiddleware');
const passport = require('./passport.js');
const session = require('express-session');
const authRouter = require('./routes/authRouter.js');
const store = new session.MemoryStore();
const CLIENT_URL = require("dotenv").config;

api.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
        store,
      })
);

api.use(passport.initialize());
api.use(passport.session());
api.use(express.static('public'));
api.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
api.use(bodyParser.json());
api.use('/api', apiRouter);
api.use(errorMiddleware);

module.exports = api;
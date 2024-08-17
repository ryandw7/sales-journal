const express = require('express');
const api = express();
const cors = require('cors');
const apiRouter = require('./routes/apiRouter');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/errorMiddleware');
const passport = require('./passport.js');

const session = require('express-session');
const store = new session.MemoryStore();
api.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
        store,
      })
);

api.use(passport.initialize());
api.use(passport.session());
api.use(express.static('public'));
api.use(cors());
api.use(bodyParser.json());
api.use('/api', apiRouter);
api.use(errorMiddleware);

module.exports = api;
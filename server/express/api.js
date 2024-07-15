const express = require('express');
const api = express();
const cors = require('cors');
const apiRouter = require('./routes/apiRouter');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/errorMiddleware')


api.use(express.static('public'));
api.use(cors());
api.use(bodyParser.json());
api.use('/api', apiRouter);
api.use(errorMiddleware);

module.exports = api;
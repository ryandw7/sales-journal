
const PORT = process.env.SERVER_PORT || 4000;
const express = require('express');
const server = express();
const apiRouter = require('./express/routes/apiRouter');
const bodyParser = require('body-parser');
const errorMiddleware = require('./express/middleware/errorMiddleware');
const CLIENT_URL = require("dotenv").config;
server.use(express.static('public'));
server.use(express.json());
server.use(bodyParser.json());
server.use('/api', apiRouter);
server.use(errorMiddleware);

server.listen(PORT, () => {
    console.log('Express server is listening on port: ' + PORT)
  });

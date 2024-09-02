// REQUIRED LIBRARIES:

require("dotenv").config;
const express = require('express');
const bodyParser = require('body-parser');

// REQUIRED MODULES

const errorMiddleware = require('./express/middleware/errorMiddleware');

const apiRouter = require('./express/routes/apiRouter');

// SERVER VARIABLES

const server = express();

const PORT = process.env.SERVER_PORT || 4000;

// SERVER SET UP

server.use(express.static('public'));

server.use(express.json());

server.use(bodyParser.json());

server.use('/api', apiRouter);

server.use(errorMiddleware);

// NPM RUN SERVE:

server.listen(PORT, () => {
    console.log('Express server is listening on port: ' + PORT)
  });

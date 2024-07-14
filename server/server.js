const express = require('express');
const server = express();
const cors = require('cors');
const apiRouter = require('./serverRoutes/apiRouter');
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const errorMiddleware = (err, req, res, next) => {
  // handle errors for all requests
  let status;
  if (err.status) {
    status = err.status;
  } else {
    status = 500
  }
  res.status(status).send(err.message);
}
server.use(express.static('public'));
server.use(cors());
server.use(bodyParser.json());
server.use('/api', apiRouter);
//server.use(errorMiddleware);

server.listen(PORT, ()=>{
  console.log(`Server is listening on port: ${PORT}...`)
});

module.exports = server;
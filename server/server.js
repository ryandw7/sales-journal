const express = require('express');
const server = express();
const cors = require('cors');
const apiRouter = require('./serverRoutes/apiRouter');
const PORT = process.env.SERVER_PORT || 5050;
const bodyParser = require('body-parser');
server.use(express.static('public'));
server.use(cors())
server.use(bodyParser.json())
server.use('/api', apiRouter)



server.listen(PORT, ()=>{
    console.log('Express server is listening on port: ' + PORT)
});
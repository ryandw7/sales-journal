const express = require('express');
const server = express();

const PORT = process.env.SERVER_PORT || 5000;

server.listen(PORT, ()=>{
    console.log('Express server is listening on port: ' + PORT)
});
const express = require('express');
const server = express();
const cors = require('cors');
const PORT = process.env.SERVER_PORT || 5050;
server.use(express.static('public'));
server.use(cors())


server.use('/api')

server.get("/", (req, res, next)=>{
    const resObj = {
        user: "yo momma"
    }
    res.send("echoe")
})

server.listen(PORT, ()=>{
    console.log('Express server is listening on port: ' + PORT)
});
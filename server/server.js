const express = require('express');
const server = express();
const cors = require('cors');
const PORT = process.env.SERVER_PORT || 5050;
const registerUser = require('./db/dbRegister.js')
server.use(express.static('public'));
server.use(cors())

const loggerMiddleware = (req, res, next) =>{
    console.log(`${req.method} request sent.`);
}
server.use(loggerMiddleware);

server.get("/", (req, res, next)=>{
    ("echoe")
});

server.post("/register", async (req, res, next) => {
    const {firstName, lastName, userName, password } = req.body;
       await registerUser(firstName, lastName, userName, password);
       res.send('User registered successfully')
})

server.listen(PORT, ()=>{
    console.log('Express server is listening on port: ' + PORT)
});
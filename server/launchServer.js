const server = require('./server');
const PORT = process.env.SERVER_PORT || 5050;

server.listen(PORT, () => {
    console.log('Express server is listening on port: ' + PORT)
  });
  
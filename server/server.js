const server = require('./express/api');
const PORT = process.env.SERVER_PORT || 4000;

server.listen(PORT, () => {
    console.log('Express server is listening on port: ' + PORT)
  });

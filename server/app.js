require('dotenv').load();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


// Database
// Connect to DB
const { DB_USERNAME, DB_PASSWORD, DB_SERVER, DB_PORT, DB_NAME, DB_AUTHDB } = process.env;
mongoose.connect(
  `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_SERVER}:${DB_PORT}/${DB_NAME}?authSource=${DB_AUTHDB}`,
  { useNewUrlParser: true })
  .catch(
    (err) => {
      console.log(`connection to the database failed with error: ${err}`);
    },
  );

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  console.log('connection')
  ws.send('something');
});
console.log('waiting');

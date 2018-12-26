require('dotenv').load();

// Database
// Connect to DB
var elasticsearch = require('elasticsearch');
var esclient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

esclient.create({
  index: 'mousepos',
  type: 'mspos',
  id: JSON.stringify(new Date()),
  body: {
    title: 'Test abc',
  }
});

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  console.log('connection')
  ws.send('something');
esclient.search({
  index: 'mousepos',
  body: {
    query: {
      match: { title: 'Test abc' }
    } 
  }
}
).then(function (response) {
    ws.send('response', response);
}
);

});
console.log('waiting');

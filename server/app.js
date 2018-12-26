require('dotenv').load();
const elasticsearch = require('elasticsearch');
const WebSocket = require('ws');

// Database
const esclient = new elasticsearch.Client({
  host: 'localhost:9200'
});

const filters = {}
for(let x=0; x<100; x++){
  for(let y=0; y<100; y++){
    filters[`${x}:${y}`] = {
      "bool": {
        "must": [
          {"match": {x}},
          {"match": {y}}
        ]
      }
    }
  }
}
let grid = []
const search = () => {
esclient.search({
  index: 'mousepos',
  body: {
    "aggs" : {
      "xy": {
        "filters": {filters}
      }
    }
  }
}).then(
  (results) => {
    const data = results.aggregations.xy.buckets
    const result2d = []
    for (let x = 0; x < 100; x++) {
      const col = []
      for (let y = 0; y < 100; y++) {
        col.push(data[`${x}:${y}`].doc_count)
      }
      result2d.push(col)
    }
    grid = result2d
  }
  );

search();
setInterval(search, 5000)
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('incoming connection');
  ws.send(JSON.stringify(grid))


  ws.on('message', (pos) => {
    esclient.index({
      index: 'mousepos',
      type: 'mspos',
      body: JSON.parse(pos)
    });
    console.log(pos);
  });

});
console.log('waiting');
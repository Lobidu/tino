require('dotenv').load();
const WebSocket = require('ws');
const fs = require('fs');

let grid = []
for(let x=0; x<100; x++){
  col = []
  for(let y=0; y<100; y++){
    col.push(0);
  }
  grid.push(col);
}

const file = `${__dirname}/gridState.json`;

fs.readFile(file,'utf8', (err, file)=>{
    if(err) return console.log(err)
    grid = JSON.parse(file);
  }
)

let fileOccupied = false;
setInterval(()=>{
  if(fileOccupied) return;
  fileOccupied = true
  fs.writeFile(file, JSON.stringify(grid), 'utf8', (err) => {
    fileOccupied = false;
    if (err) console.log(err)
  });
},10000)

const getMaximumIntensity = () => {
  const colMaxima = grid.map((col) => (Math.max.apply(Math, col)))
  return Math.max.apply(null, colMaxima);
};

const getData = () => ({
  grid,
  maxIntensity: getMaximumIntensity() || 1,
})

const wss = new WebSocket.Server({ port: 4622 });

wss.on('connection', (ws) => {
  ws.send(JSON.stringify(getData()));

  ws.on('message', (pos) => {
    const [ x, y ] = JSON.parse(pos);
    if(typeof x !== 'number' || typeof y !== 'number') return;
    if(x < 0 || x > 100 || y < 0 || y > 100) return;

    grid[x][y]++;

  });
});

console.log('waiting');

const WebSocket = require('ws');
const AWS = require('aws-sdk');
const crypto = require('crypto');

const bucketName = 'cup.janis';
const stateFileName = 'data.json';
AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_ACCESS_SECRET,
});

const s3 = new AWS.S3();

// This is just for reference.
let state = {
  grid: [],
  visitors: []
};

const loadState = async () => {
  return new Promise(
    (resolve) => {
      s3.getObject({
          Bucket: bucketName,
          Key: stateFileName,
        },
        // yes, a callback. Aws isn't in 2019 yet.
        (err, res) => {
          if (err) {
            console.log(err);
            process.exit(1);
          }
          body = res.Body.toString();
          state = JSON.parse(body);
          resolve();
        }
      );
    }
  );
};

const saveState = () => {
  const payload = {
    Bucket: bucketName,
    Key: stateFileName,
    Body: JSON.stringify(state)
  };
  s3.upload(payload, console.log);
};

setInterval(()=>{
  saveState();
},100000);

const getData = () => {
  const { grid, visitors } = state;
  return {
    grid,
    visitors: visitors.length,
  }
};

const generateVisitorId = () => {
  return crypto.randomBytes(32).toString("hex");
};

const registerVisitor = (visitorId = undefined) => {
  if(!visitorId || !state.visitors.includes(visitorId)){
    const newId = generateVisitorId();
    state.visitors.push(newId);
    return newId
  } else {
    return visitorId
  }
};

const handlePositionUpdate = ([ x, y ]) => {
  // Validate the input
  if(typeof x !== 'number' || typeof y !== 'number') return;
  if(x < 0 || x > 100 || y < 0 || y > 100) return;
  // All good, increment the counter at that position
  state.grid[x][y]++;
};
const main = async () => {

  await loadState();

  const wss = new WebSocket.Server({ port: 4622 });

  wss.on('connection', (ws, req) => {
    // We send the current grid state immediately.
    ws.send(JSON.stringify(getData()));

    ws.on('message', (data) => {
      const parsed = JSON.parse(data);

      // The more common event is the actual position update.
      if (Array.isArray(parsed) && parsed.length == 2) {
        return handlePositionUpdate(data)
      }

      // Alternatively it's the handshake. Then lets try to get the
      // visitorId.
      const { message, visitorId } = parsed;
      if (message && message === 'handshake'){
        const visitorId = registerVisitor(visitorId);
        ws.send(JSON.stringify({visitorId}))
      }
    });
  });

  console.log('waiting');
}

main();
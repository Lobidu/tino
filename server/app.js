const WebSocket = require('ws');
const http = require('http');
const AWS = require('aws-sdk');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

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
  s3.upload(payload, err => err ? console.log(err) : null);
};

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

const isValidVisitorId = (visitorId) => {
  return state.visitors.includes(visitorId)
};

const registerVisitor = (visitorId) => {
  if(!state.visitors.includes(visitorId)){
    state.visitors.push(visitorId);
  }
};

const handlePositionUpdate = ([ x, y ]) => {
  // Validate the input
  if(typeof x !== 'number' || typeof y !== 'number') return;
  if(x < 0 || x > 100 || y < 0 || y > 100) return;
  // All good, increment the counter at that position
  state.grid[x][y]++;
};

const fetchVidFromCookies = (reqCookieStr) => {
  const cookie = /vid=([a-f0-9]+)((;?)|($))/.exec(reqCookieStr);
  return cookie ? cookie[1] : null;
};

async function main() {

  await loadState();

  setInterval(()=>{
    saveState();
  },100000);

  const server = http.createServer();

  const wss = new WebSocket.Server({ server });

  wss.on('headers', (headers, req) => {
    const existingVid = fetchVidFromCookies(req.headers.cookie);
    req.visitorId = isValidVisitorId(existingVid) ? existingVid : generateVisitorId();
    if (!existingVid) {
      headers.push(`Set-Cookie: vid=${req.visitorId}`)
    }
  });

  wss.on('connection', (ws, req) => {
    // We send the current grid state immediately.
    ws.send(JSON.stringify(getData()));

    let userIsRegistered = false;
    ws.on('message', (data) => {
      const parsed = JSON.parse(data);
      // The more common event is the actual position update.

      const isValidMessage = (Array.isArray(parsed) && parsed.length === 2);

      if (isValidMessage) {
        handlePositionUpdate(parsed);
      }

      if (!userIsRegistered && isValidMessage) {
        registerVisitor(req.visitorId);
        userIsRegistered = true;
      }
    });
  });

  server.listen(4622);
  console.log('waiting');
}

main();
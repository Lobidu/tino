require('dotenv').load();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Database
// Connect to DB
const { DB_USERNAME, DB_PASSWORD, DB_SERVER, DB_PORT, DB_NAME } = process.env;
mongoose.connect(
  `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_SERVER}:${DB_PORT}/${DB_NAME}`,
  { useNewUrlParser: true })
  .catch(
    (err) => {
      console.log(`connection to the database failed with error: ${err}`);
    },
  );
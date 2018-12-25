
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Database
// Connect to DB
mongoose.connect(
  'mongodb://<dbuser>:<dbpassword>@novus.modulusmongo.net:27017/<dbName>',
  { useNewUrlParser: true })
  .catch(
    (err) => {
      console.log(`connection to the database failed with error: ${err}`);
    },
  );
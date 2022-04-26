const mongoose = require('mongoose');
const express = require('express');
const app = express();
const config = require('config');
const users2 = require('./routes/users2');
const auth2 = require('./routes/auth2');
const genres = require('./routes/genres');
const res = require('express/lib/response');
if(!config.get('jwtPrivateKey')){
    console.error('Fatal Error');
    process.exit(1);//anything but not 0 bc it refers that the process is success
}

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
app.use(express.json());
app.use('/api/users2',users2);
app.use('/api/genres',genres);
app.use('/api/auth2',auth2);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
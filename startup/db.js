const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports= function(){
    const db = config.get('db');
    mongoose.connect(db) //auto read the db key at default.json
    .then(() => winston.info(`Connected to ${db}`));
    //no catch bc its automatically throw error from index
}
const winston = require('winston');
//require('winston-mongodb');
require('express-async-errors');
require('../middleware/error');

module.exports=function(){
    winston.handleExceptions( //for uncaught exceptions only
    new winston.transports.Console({colorize:true, prettyPrint:true}),
    new winston.transports.File({filename:'uncaughtexceptions.log'}));

    process.on('unhandledRejection',(ex)=>{
     throw ex; //treck to be caught by handle exceptions function which is for sync
      //winston.error(ex.message,ex);//another way to handle rejections
    });
  
    /* winston.add(winston.transports.File,{filename:'logfile.log'}); //another way to caught uncaught exceptions
    winston.add(winston.transports.MongoDB,{
    db:'mongodb://localhost/vidly', //we log errors in vidly database
    level:"info" //just error will appear but if we select info it will show info level to above ones
    
});
*/
}
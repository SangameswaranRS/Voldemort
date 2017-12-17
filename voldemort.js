var express=require('express');
var app=express();
var logger = require('morgan');
var connection=require('./Connection/connection');
var bodyParser=require('body-parser');
var dbConnectionHandler=require('./middleware/dbConnectionHandler');
var corsHandler=require('./middleware/corsHandler');
app.use(function (req,res,next) {
    corsHandler.handleCrossOriginRequest(req,res,next);
});
app.use(function (req,res,next) {
    dbConnectionHandler.connectionChecker(req,res,next);
});
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
var routes=require('./homeRoutes')(app);
app.listen(5959);
console.log('listening to requests at port 5959');
module.exports=app;


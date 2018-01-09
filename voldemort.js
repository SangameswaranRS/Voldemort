var express=require('express');
var app=express();
var logger = require('morgan');
var cors=require('cors');
var connection=require('./Connection/connection');
var bodyParser=require('body-parser');
var dbConnectionHandler=require('./middleware/dbConnectionHandler');
var corsHandler=require('./middleware/corsHandler');
var sessionAuthorizationHandler=require('./middleware/sessionAuthorizationHandler');
var port=5959;
app.use(cors());
app.use(function (req,res,next) {
    corsHandler.handleCrossOriginRequest(req,res,next);
});
app.use(function (req,res,next) {
    dbConnectionHandler.connectionChecker(req,res,next);
});
app.use('/server/api',function (req,res,next) {
    sessionAuthorizationHandler.HandleSessionAndAuth(req,res,next);
});
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true,limit :'50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));
var routes=require('./homeRoutes')(app);
app.listen(port);
console.log('listening to requests at port' +port);
module.exports=app;


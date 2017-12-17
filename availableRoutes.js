(function () {
    var express=require('express');
    var Router=express.Router();
    Router.get('/testConn',function (req,res) {
       res.send('Connection OK');
    });
    module.exports=Router;
})();
(function () {
    var connection=require('../Connection/connection');
    module.exports.HandleSessionAndAuth=function (req,res,next) {
        var userName=req.get('userName');
        var token=req.get('accessToken');
        var failureJson={
           statusCode : 500,
            message : "Something went Wrong! Try again!"
        };
        if(typeof (token)==='undefined'){
            console.log('Token Undefined - Session timed out');
            //HTTP: 423 -Locked
            var redirectJson={
                statusCode :423,
                message : "Session Expired"
            };
            res.status(423).send(redirectJson);
        } else{
            var userId;
            connection.beginTransaction(function (err) {
               if(err){
                   res.status(500).send(failureJson);
               }else{
                   connection.query('select userId from user where userName = ?',userName,function (err,data) {
                      if(err){
                          console.log("Session Auth Handler : ERR ="+err);
                          res.status(500).send(failureJson);
                      } else {
                          if(data===undefined){
                              console.log("Data Undefined Session Auth Handler ");
                              res.status(500).send(failureJson);
                          }else if(data.length>0){
                              //success
                              var data0=data[0];
                              if(data0 !==undefined){
                                 userId=data0.userId ;
                                  connection.query("select * from usertosessionmap where userId=? and sessionToken=?",[userId,token],function (err,data) {
                                      if(err){
                                          var errorJson={
                                              statusCode :500,
                                              message : "Something went wrong, Try again!"
                                          };
                                          console.log(err);
                                          res.status(500).send(errorJson);
                                      }else{
                                          if(data.length>0){
                                              console.log(data);
                                              console.log('Auth OK');
                                              next();
                                          }else {
                                              var sessionExpiredJson={
                                                  statusCode :500,
                                                  message :'Session Expired'
                                              };
                                              res.status(500).send(sessionExpiredJson);
                                          }
                                      }
                                  });

                              }
                          }else{
                              console.log("Null data Session Auth Handler");
                              res.status(500).send(failureJson);
                              console.log('NP');
                          }
                      }
                   });
               }

            });
        }
    }
})();
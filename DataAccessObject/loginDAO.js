(function () {
    var connection=require('../Connection/connection');
    module.exports.authenticateCredentials=function (userName,password,callBack) {
        connection.beginTransaction(function (err) {
           if(err){
               callBack(err,userName);
           } else{
               connection.query('select * from user where userName = ?',userName,function (err,data) {
                  if(err){
                      connection.rollback(function () {
                          callBack(err,data);
                      });
                  } else{
                      console.log(data);
                      if(data ===undefined){
                          callBack(404,data);
                      }else if(data.length>0){
                          var data0=data[0];
                          var actualPassword=data0.password;
                          if(password===actualPassword){
                              //continue checking session,passwords match
                              var userId=data0.userId;
                              connection.query('select * from usertosessionmap where userId=?',userId,function (err,data) {
                                 if(err){
                                     connection.rollback(function () {
                                         console.log("25 ERR"+err);
                                        callBack(500,data);
                                     });
                                 } else{
                                     if(data.length>0){
                                         console.log(data);
                                         if(data !==undefined){
                                             var data0=data[0];
                                             var sessionToken=data0.sessionToken;
                                             connection.commit(function (err) {
                                                //commit transaction, Actually no need for select queries though!
                                                 if(err){
                                                     callBack(err,data);
                                                 }else {
                                                     var callBackJson={
                                                        userId : userId,
                                                         sessionToken : sessionToken
                                                     };
                                                     callBack(null, callBackJson);
                                                 }
                                             });
                                         }
                                     }else if(data===undefined){
                                         connection.rollback(function () {
                                             console.log("46ERR");
                                            callBack(500,data);
                                         });
                                     }else{
                                         //session expired,create new session
                                         console.log('Session Expired, Creating new Session');
                                         generateAccessToken(function (err,data) {
                                            if(err ===null){
                                                var accessToken=data;
                                                connection.query('insert into usertosessionmap values (?,?)',[userId,accessToken],function (err,data) {
                                                   if(err){
                                                       connection.rollback(function () {
                                                          callBack(err,data);
                                                       });
                                                   } else{
                                                       connection.commit(function (err) {
                                                          if(err){
                                                              console.log('Error Commiting transaction');
                                                              connection.rollback(function () {
                                                                  callBack(err,data);
                                                              });
                                                          } else{
                                                              callBack(null,accessToken);
                                                          }
                                                       });
                                                   }
                                                });
                                            }
                                         });
                                     }
                                 }
                              });
                          }else{
                              connection.rollback(function () {
                                 callBack(401,data);
                              });
                          }
                      }else{
                          callBack(404,data);
                      }
                  }
               });
           }
        });
    };
    var generateAccessToken=function (callBack) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        callBack(null,text);
    };
})();
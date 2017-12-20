(function () {
    var connection=require('../Connection/connection');
    module.exports.getInitInfoFromTable=function (userId,callBack) {
        var userConfigJson;
        var followingUserCountJson;
        var followedUserCountJson;
        connection.beginTransaction(function (err) {
           if(err){
               connection.rollback(function () {
                  callBack(err,null);
               });
           } else{
               connection.query('select * from user where userId=?',userId,function (err,data) {
                  if(err){
                      connection.rollback(function () {
                         callBack(err,null);
                      });
                  } else{
                      //transaction no need.
                      if(data.length>0){
                          userConfigJson=data[0];
                          if(userConfigJson !==undefined){
                              connection.query('select count(*) as count from usertofollowingmap where userId=?;',userId,function (err,data) {
                                 if(err){
                                     connection.rollback(function () {
                                        callBack(err,null);
                                     });
                                 } else{
                                     if(data.length>0){
                                         if(data[0]!==undefined){
                                            followingUserCountJson=data[0];
                                            connection.query('select count(*) as count from usertofollowersmap where userId=?;',userId,function (err,data) {
                                               if(err){
                                                   connection.rollback(function () {
                                                      callBack(err,null);
                                                   });
                                               } else{
                                                   if(data.length>0){
                                                       if(data[0]!==undefined){
                                                           followedUserCountJson=data[0];
                                                           var callBackJson={
                                                               userConfigJson :userConfigJson,
                                                               followingUserJson :followingUserCountJson,
                                                               followedUserJson : followedUserCountJson
                                                           };
                                                           console.log(callBackJson);
                                                           connection.commit(function () {
                                                              callBack(null,callBackJson);
                                                           });
                                                       }else{
                                                           callBack(500,null);
                                                       }
                                                   }
                                               }
                                            });
                                         }else{
                                             callBack(500,null);
                                         }
                                     }else{
                                         connection.rollback(function () {
                                            callBack(500,null);
                                         });
                                     }
                                 }
                              });
                          }else{
                              connection.rollback(function () {
                                  callBack(500,null);
                              });
                          }
                      }else{
                          connection.rollback(function () {
                             callBack(404,null);
                          });
                      }
                  }
               });
           }
        });
    }
})();
(function () {
    var connection=require('../Connection/connection');
    module.exports.updateLikeInfo=function (postId,userId,callBack) {
        connection.beginTransaction(function (err) {
           if(err){
               connection.rollback(function () {
                  callBack(err,null);
               });
           } else{
               connection.query('update postInfo set likeCount=likeCount+1 where postId =?;',postId,function (err,data) {
                  if(err){
                      connection.rollback(function () {
                          callBack(err,null);
                      });
                  } else{
                    connection.query('insert into posttolikemap values(?,?)',[postId,userId],function (err,data) {
                       if(err){
                           connection.rollback(function () {
                               callBack(err,null);
                           });
                       } else{
                           connection.commit(function (err) {
                              if(err){
                                  connection.rollback(function () {
                                     callBack(err,null);
                                  });
                              } else{
                                  //commit success
                                  callBack(null,data);
                              }
                           });
                       }
                    });
                  }
               });
           }
        });
    };
})();
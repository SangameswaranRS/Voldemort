(function () {
    var connection = require('../Connection/connection');
    module.exports.updateCommentInfo = function (postParamJson,callBack) {
       connection.beginTransaction(function (err) {
           if(err){
               callBack(err,null);
           }else{
               connection.query('update postInfo set commentCount =commentCount +1 where postId = ?;',postParamJson.postId,function (err,data) {
                  if(err){
                      connection.rollback(function () {
                         callBack(err,null);
                      });
                  } else{
                      connection.query('insert into comments set ?',postParamJson,function (err,data) {
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
                                    callBack(null,data);
                                }
                             });
                         }
                      });
                  }
               });
           }
       })
    }
})();
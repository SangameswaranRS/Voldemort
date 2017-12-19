(function () {
    var connection=require('../Connection/connection');
    module.exports.storeData=function (userId,followingUserId,callBack) {
        connection.beginTransaction(function (err) {
           if(err){
               connection.rollback(function () {
                   callBack(err,'transErr');
               });
           } else{
               connection.query('insert into usertofollowingmap values(?,?)',[userId,followingUserId],function (err,data) {
                  if(err){
                    connection.rollback(function () {
                        callBack(err,data);
                    });
                  } else{
                    connection.query('insert into usertofollowersmap values(?,?)',[followingUserId,userId],function (err,data) {
                        if(err){
                            connection.rollback(function () {
                              callBack(err,data);
                            });
                        }else{
                            connection.commit(function (err) {
                               if(err){
                                   callBack('commitErr',data);
                               } else{
                                   callBack(null,data);
                               }
                            });
                        }
                    });
                  }
               });
           }
        });
    }
})();
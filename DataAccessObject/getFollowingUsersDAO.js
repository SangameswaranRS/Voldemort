(function () {
    var connection=require('../Connection/connection');
    module.exports.getData=function (userId,callBack) {
        connection.query('select * from user where userId in (select followingUserId from usertofollowingmap where userId=?);',userId,function (err,data) {
           if(err){
               callBack(err,null);
           } else{
               callBack(null,data);
           }
        });
    }
})();
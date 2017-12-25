(function () {
    var connection=require('../Connection/connection');
    module.exports.getProfileInfo=function (userId,callBack) {
        connection.query('select * from usertoprofessionmap where userId=?',userId,function (err,data) {
           callBack(err,data);
        });
    }
})();
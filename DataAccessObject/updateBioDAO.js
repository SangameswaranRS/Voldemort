(function () {
    var connection=require('../Connection/connection');
    module.exports.updateBio=function (userId,newBio,callBack) {
        connection.query('update user set aboutString=? where userId=?',[newBio,userId],function (err,data) {
           callBack(err,data);
        });
    }
})();
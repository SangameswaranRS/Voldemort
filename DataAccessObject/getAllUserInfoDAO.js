(function () {
    var connection = require('../Connection/connection');
    module.exports.getAllUserInfo = function (callBack) {
        connection.query('select user.userName,user.userId from user',function (err,data) {
           callBack(err,data);
        });
    }
})();
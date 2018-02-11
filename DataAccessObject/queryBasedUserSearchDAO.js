(function () {
    var connection = require('../Connection/connection');
    module.exports.queryBasedUserSearch = function (query,callBack) {
        var searchString ='%'+query+'%';
      connection.query('select * from user where userName like ?',searchString,function (err,data) {
        callBack(err,data);
      });
    };
})();
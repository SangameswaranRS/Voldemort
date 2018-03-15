(function () {
    var connection = require('../Connection/connection');
    module.exports.queryBasedUserSearch = function (query,callBack) {
        var searchString ='%'+query+'%';
      connection.query('select userId,userName from user where userName like ?',searchString,function (err,data) {
        callBack(err,data);
      });
    };
})();
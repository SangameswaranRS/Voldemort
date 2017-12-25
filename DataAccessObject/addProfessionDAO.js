(function () {
    var connection=require('../Connection/connection');
    module.exports.updateProfession=function (jsonBody,callBack) {
        connection.query('insert into usertoprofessionmap set ?',jsonBody,function (err,data) {
           callBack(err,data);
        });
    }
})();
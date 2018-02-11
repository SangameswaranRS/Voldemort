(function () {
    var getAllUserInfoDAO = require('../DataAccessObject/getAllUserInfoDAO');
    module.exports.getAllUser = function (req,res) {
      getAllUserInfoDAO.getAllUserInfo(function (err,data) {
         if(err){
             var failureJson={
                 statusCode : 500,
                 message : err
             };
             res.status(500).send(failureJson);
         } else{
             var successJson ={
                 statusCode : 200,
                 message : data
             };
             res.send(successJson);
         }
      }) ;
    };
})();
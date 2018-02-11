(function () {
    var queryBasedUserSearchDAO = require('../DataAccessObject/queryBasedUserSearchDAO');
    module.exports.queryBasedSearch = function (req,res) {
      queryBasedUserSearchDAO.queryBasedUserSearch(req.query.search,function (err,data) {
         if(err){
             var failureJson={
                 statusCode : 500,
                 message : err
             };
             res.status(500).send(failureJson);
         } else{
             var successJson ={
                 statusCode  : 200,
                 message : data
             };
             res.send(successJson);
         }
      });
    };
})();
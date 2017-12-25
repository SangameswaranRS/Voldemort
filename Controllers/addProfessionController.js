(function () {
    var addProfessionDAO=require('../DataAccessObject/addProfessionDAO');
    module.exports.addProfession=function (req,res) {
      var jsonBody={
          userId : req.body.userId,
          position : req.body.position,
          organization : req.body.organization
      };
      addProfessionDAO.updateProfession(jsonBody,function (err,data) {
          if(err){
              var errorJson={
                  statusCode : 500,
                  message : err.message
              };
              res.status(500).send(errorJson);
          }else {
              var successJson={
                  statusCode : 200,
                  message : 'Profession Successfully saved'
              };
              res.send(successJson);
          }
      });
    };
})();
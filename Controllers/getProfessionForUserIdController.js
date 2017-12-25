(function () {
    var getProfessionForUserIdDAO=require('../DataAccessObject/getProfessionForUserIdDAO');
    module.exports.getProfession=function (req,res) {
        var userId=req.body.userId;
        if(userId ===undefined){
            var errorJson={
                statusCode : 400,
                message :' Bad Request'
            };
            res.status(400).send(errorJson);
        }else{
            getProfessionForUserIdDAO.getProfileInfo(userId,function (err,data) {
               if(err){
                   var errorJson={
                       statusCode : 500,
                       message : err.message
                   };
                   res.status(500).send(errorJson);
               } else{
                   var successJson={
                       statusCode : 200,
                       message :data
                   };
                   res.send(successJson);
               }
            });
        }
    }
})();
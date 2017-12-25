(function () {
    var updateBioDAO=require('../DataAccessObject/updateBioDAO');
    module.exports.updateBio=function (req,res) {
        var userId=req.body.userId;
        var newBio=req.body.newBio;
        if(userId===undefined||newBio===undefined){
            var badRequest={
                statusCode : 400,
                message : 'Bad Request'
            };
            res.status(400).send(badRequest);
        }else{
            updateBioDAO.updateBio(userId,newBio,function (err,data) {
               if(err){
                   var fJson={
                       statusCode : 500,
                       message : err.message
                   };
                   res.status(500).send(fJson);
               } else{
                   var successResponse={
                       statusCode : 200,
                       message : 'Bio Updated successfully'
                   };
                   res.send(successResponse);
               }
            });
        }
    }
})();
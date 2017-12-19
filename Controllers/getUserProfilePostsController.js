(function () {
    var getUserProfilePostsDAO=require('../DataAccessObject/getUserProfilePostsDAO');
    module.exports.getUserProfilePosts=function (req,res) {
        getUserProfilePostsDAO.getUserPosts(req.body.userId,function (err,data) {
           if(err){
               var error={
                   statusCode :500,
                   message: 'Something went wrong!, Try again!'
               };
               res.status(500).send(error);
           } else{
               var successResponse={
                   statusCode :200,
                   message :data
               };
               res.send(successResponse);
           }
        });
    }
})();
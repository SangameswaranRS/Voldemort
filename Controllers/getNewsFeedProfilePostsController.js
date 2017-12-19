(function () {
    var getNewsFeedProfilePostsDAO=require('../DataAccessObject/getNewsFeedProfilePostsDAO');
    module.exports.getNewsFeedPosts=function (req,res) {
        getNewsFeedProfilePostsDAO.getDataFromTable(req.body.userId,function (err,data) {
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
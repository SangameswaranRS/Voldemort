(function () {
    var unlikePostDAO = require('../DataAccessObject/unlikePostDAO');
    module.exports.unlikePost=function (req,res) {
        var userId = req.body.userId;
        var postId = req.body.postId;
        var failJson={
          statusCode : 500,
            message : 'Something went wrong! Try again'
        };
        var successJson={
            statusCode : 200,
            message : 'Post Unliked'
        };
        unlikePostDAO.updateLikeInfo(postId,userId,function (err,data) {
           if(err){
               res.status(500).send(failJson);
           } else{
                res.send(successJson);
           }
        });
    };
})();
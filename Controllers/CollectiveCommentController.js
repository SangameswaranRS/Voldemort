(function () {
    var CommentDAO = require('../DataAccessObject/CommentDAO');
    module.exports.addComment = function (req,res) {
        var postParam ={
            userId: req.body.userId,
            postId: req.body.postId,
            comments: req.body.comments
        };
        CommentDAO.updateCommentInfo(postParam,function (err,data) {
           if(err){
               var failureJson={
                   statusCode : 500,
                   message : err.message
               };
               res.status(500).send(failureJson);
           } else{
               var successResponse={
                   statusCode : 200,
                   message : "Comment updated successfully"
               };
               res.send(successResponse);
           }
        });
    };
})();
(function () {
    var likePostDAO=require('../DataAccessObject/likePostDAO');
    module.exports.likePost=function (req,res) {
        var postId=req.body.postId;
        var userId=req.body.userId;
        likePostDAO.updateLikeInfo(postId,userId,function (err,data) {
           if(err===null){
               //success
               var success={
                   statusCode :200,
                   message : 'post liked'
               };
               res.send(success);
           } else{
               //fail
               var failureJson={
                   statusCode : 500,
                   message : 'Something went wrong! Try again!!'
               };
               res.status(500).send(failureJson);
           }
        });
    };
})();
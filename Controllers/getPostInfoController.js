(function () {
    var getPostInfoDAO = require('../DataAccessObject/getPostInfoDAO');
    var postInfo;
    var commentInfo;
    module.exports.getPostInfo=function (req,res) {
        var postId = req.query.postId;
        //console.log(postId);
        if (postId === undefined || postId === null) {
            var failureJson = {
                statusCode: 400,
                message: 'Bad Request'
            };
            res.status(400).send(failureJson);
        }
        else {
            getPostInfoDAO.getPostInfo(postId, function (err, data) {
                if(err){
                    var failureJson ={
                        statusCode : 500,
                        message : err.message
                    };
                    res.status(500).send(failureJson);
                }else{
                    if(data !== undefined && data.length>0){
                        //console.log(data);
                        postInfo = data[0];
                        getPostInfoDAO.getCommentInfo(postId,function (err,data) {
                           if(err){
                               var failureJson ={
                                   statusCode : 500,
                                   message : err.message
                               };
                               res.status(500).send(failureJson);
                           }
                           else{
                               commentInfo = data;
                               var successJson={
                                   statusCode :200,
                                   message : 'OK',
                                   postInfo : postInfo,
                                   commentInfo : commentInfo
                               };
                               res.status(200).send(successJson);
                           }
                        });
                    }
                    else{
                        var failureJson1={
                            statusCode:404,
                            message:'Not Found'
                        };
                        res.status(404).send(failureJson1);
                    }
                }
            });
        }
    }
})();
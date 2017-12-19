(function () {
    var postFollowingDAO=require('../DataAccessObject/postFollowingDAO');
    module.exports.onPostFollowing=function (req,res) {
        var userId = req.body.userId;
        var followingUserId = req.body.followingUserId;
        postFollowingDAO.storeData(userId,followingUserId,function (err,data) {
            if(err===null){
                var successJson={
                    statusCode : 200,
                    message : 'user is currently being followed'
                };
                res.send(successJson);
            }else{
                var failureJson={
                    statusCode: 500,
                    message : 'Error Following user try again!'
                }
                res.status(500).send(failureJson);
            }
        });

    }
})();
(function () {
    var connection=require('../Connection/connection');
    module.exports.getUserPosts=function (userId,callBack) {
        console.log(userId);
        connection.query('select postinfo.postId,postInfo.postContent,postInfo.likeCount,postInfo.commentCount,postInfo.imageUrl,postInfo.postTime,usertopostmap.userId from postinfo inner join usertopostmap on postinfo.postId = usertopostmap.postId and usertopostmap.userId=?;',userId,function (err,data) {
           if(err){
               callBack(err,null);
           } else{
               callBack(null,data);
           }
        });

    };
    module.exports.getLikedPosts=function (userId,callBack) {
        connection.query('select postId from postToLikeMap where userId=?;',userId,function (err,data) {
            if(err){
                callBack(err,null);
            }  else{
                callBack(null,data);
            }
        });
    }
})();
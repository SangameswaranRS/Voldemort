(function () {
    var connection = require('../Connection/connection');
    module.exports.getPostInfo = function (postId,callBack) {
        connection.query('select postInfo.postId,postInfo.postContent,postInfo.likeCount,postInfo.commentCount,usertopostmap.userId,user.userName,postInfo.postTime from postinfo inner join usertopostmap on postInfo.postId = usertopostmap.postId inner join user on usertopostmap.userId = user.userId where postInfo.postId = ?;',postId,function (err,data) {
           callBack(err,data);
        });
    };

    module.exports.getCommentInfo = function (postId,callBack) {
      connection.query('select comments.postId,comments.comments,comments.userId,user.userName from comments inner join user on comments.userId = user.userId where postId = ?;',postId,function (err,data) {
        callBack(err,data);
      });
    };
})();
(function () {
    var getUserInitConfigDAO=require('../DataAccessObject/getUserInitConfigDAO');
    module.exports.getInitConfig=function (req,res) {
        var userId=req.body.userId;
        if(userId===undefined){
            var badRequestJson={
                statusCode : 400,
                message : 'Bad Request'
            };
            res.status(400).send(badRequestJson);
        }else{
            var userConfigJson,followingUserCountJson,followedUserCountJson;
            getUserInitConfigDAO.getInitInfoFromTable(userId,function (err,data) {
                if(err===null){
                    userConfigJson=data.userConfigJson;
                    followedUserCountJson=data.followedUserJson;
                    followingUserCountJson=data.followingUserJson;
                    var successResponse={
                        statusCode : 200,
                        aboutString :userConfigJson.aboutString,
                        dpImgUrl : userConfigJson.dpImgUrl,
                        userName : userConfigJson.userName,
                        userEmailId : userConfigJson.userEmailId,
                        gender : userConfigJson.gender,
                        followers : followedUserCountJson.count,
                        following : followingUserCountJson.count
                    };
                    res.send(successResponse);
                }else if(err===404){
                    var errJson={
                        statusCode : 404,
                        message : 'User Not registered'
                    };
                    res.status(404).send(errJson);
                }else{
                    console.log(err);
                    var servErr={
                        statusCode :500,
                        message : 'Something Went wrong! Try Again !!'
                    };
                    res.status(500).send(servErr);
                }
            });
        }
    }
})();
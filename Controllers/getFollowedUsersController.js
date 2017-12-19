(function () {
    var getFollowedUsersDAO=require('../DataAccessObject/getFollowedUsersDAO');
    module.exports.getFollowedUsers=function (req,res) {
        getFollowedUsersDAO.getData(req.body.userId,function (err,data) {
            if(err===null){
                var successResponse={
                    statusCode :200,
                    message :data
                };
                res.send(successResponse);
            } else{
                var error={
                    statusCode :500,
                    message: 'Something went wrong!, Try again!'
                };
                res.status(500).send(error);
            }
        });
    }
})();
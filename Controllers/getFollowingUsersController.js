(function () {
    var getFollowingUsersDAO=require('../DataAccessObject/getFollowingUsersDAO');
    module.exports.getFollowingUsers=function (req,res) {
        getFollowingUsersDAO.getData(req.body.userId,function (err,data) {
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
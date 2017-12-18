(function () {
    var connection=require('../Connection/connection');
    module.exports.HandleSessionAndAuth=function (req,res,next) {
        var userId=req.get('userId');
        var token=req.get('accessToken');
        console.log("UserName : "+userId+"AccessToken : "+token);
        if(typeof (token)==='undefined'){
            console.log('Token Undefined');
        }else{
            connection.query("select * from usertosessionmap where userId=? and sessionToken=?",[userId,token],function (err,data) {
                if(err){
                    var errorJson={
                        statusCode :500,
                        message : "Something went wrong, Try again!"
                    };
                    console.log(err);
                    res.status(500).send(errorJson);
                }else{

                }
            });
        }
        next();
    }
})();
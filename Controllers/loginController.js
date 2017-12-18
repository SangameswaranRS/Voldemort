(function () {
    var loginDAO=require('../DataAccessObject/loginDAO');
    var userName,password;
    module.exports.onLoginInfoSubmit=function (req,res) {
        userName=req.body.userName;
        password=req.body.password;
        loginDAO.authenticateCredentials(userName,password,function (err,data) {
           if(err===null){
               var accessToken=data;
               var successJson={
                    statusCode : 200,
                   message : "Logged in successfully",
                   token : accessToken
               };
               res.send(successJson);
           } else if(err === 401){
               var fj1={
                    statusCode :401,
                    message : "Wrong password"
               };
               res.status(401).send(fj1);
           }else if(err === 404){
               var fj2={
                   statusCode :404,
                   message : "User not registered"
               };
               res.status(404).send(fj2);
           }else{
               console.log(err);
               var failureJson={
                   statusCode : 500,
                   message : "Login Unsuccessful,Try again"
               };
               res.status(500).send(failureJson);
           }
        });
    }
})();
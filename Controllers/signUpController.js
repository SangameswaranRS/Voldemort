(function () {
    var signUpDAO=require('../DataAccessObject/signUpDAO');
    module.exports.onSignUpInfoSubmit=function (req,res) {
        var postParamJson={
            userName : req.body.userName,
            userEmailId :req.body.userEmailId,
            password : req.body.password,
            gender : req.body.gender,
            aboutString : req.body.aboutString,
            dpImgUrl : req.body.dpImgUrl
        };
        signUpDAO.registerUser(postParamJson,function (err,data) {
           if(err){
               var signUpError={
                   statusCode : 500,
                   message : 'Sign Up Unsuccessful! Try again.'
               };
               res.status(500).send(signUpError);
           }else{
                var successJson={
                    statusCode : 200,
                    message :'Signed up successfully',
                    token : data
                };
                res.send(successJson);
           }
        });
    };
})();
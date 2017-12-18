(function () {
    var express=require('express');
    var signUpController=require('./Controllers/signUpController');
    var loginController=require('./Controllers/loginController');
    var Router=express.Router();
    Router.post('/webLogin',function (req,res) {
        loginController.onLoginInfoSubmit(req,res);
    });
    Router.post('/signUp',function (req,res) {
        signUpController.onSignUpInfoSubmit(req,res);
    });
    module.exports=Router;
})();
(function () {
    var express=require('express');
    var signUpController=require('./Controllers/signUpController');
    var Router=express.Router();
    Router.post('/webLogin',function (req,res) {
    });
    Router.post('/signUp',function (req,res) {
        signUpController.onSignUpInfoSubmit(req,res);
    });
    module.exports=Router;
})();
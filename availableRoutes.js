(function () {
    var express=require('express');
    var Router=express.Router();
    var getImageController=require('./Controllers/getImageController');
    var postFollowingController=require('./Controllers/postFollowingController');
    var createNewPostController=require('./Controllers/createNewPostController');
    var getFollowinggUsersController=require('./Controllers/getFollowingUsersController');
    var getFollowedUsersController=require('./Controllers/getFollowedUsersController');
    var likePostController=require('./Controllers/likePostController');
    var getUserInitConfigController=require('./Controllers/getUserInitConfigController');
    var getUserProfilePostsController=require('./Controllers/getUserProfilePostsController');
    var getNewsFeedProfilePostsController=require('./Controllers/getNewsFeedProfilePostsController');
    var addProfessionController=require('./Controllers/addProfessionController');
    var getProfessionForUserIdController=require('./Controllers/getProfessionForUserIdController');
    var updateBioController=require('./Controllers/updateBioController');
    var unlikePostController =require('./Controllers/unlikePostController');
    var getAllUserInfoController = require('./Controllers/getAllUserInfoController');
    var queryBasedUserSearchController = require('./Controllers/queryBasedUserSearchController');
    var CollectiveCommentController = require('./Controllers/CollectiveCommentController');
    var getPostController = require('./Controllers/getPostInfoController');
    var multer = require('multer');
    var Storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, "C://Users/Sangameswaran/profPics/");
        },
        filename: function(req, file, callback) {
            console.log(file);
            callback(null, req.get('userName') + "_" + Date.now() + "_" + file.originalname);
        }
    });
    var upload = multer({
        storage: Storage
    }).array("image", 3);
    Router.get('/testConn',function (req,res) {
       res.send('Connection OK');
    });
    Router.get('/getFileTest',function (req,res) {
        getImageController.getImages(req,res);
    });
    Router.post('/uploadFileTest',function (req,res) {
        console.log(req.body);
        upload(req, res, function(err) {
            if (err) {
                console.log(err);
                var errorJson={
                  statusCode : 500,
                    message : 'Error Uploading file! Try Again !!'
                };
                return res.status(500).send(errorJson);
            }else {
                var successJson={
                  statusCode : 200,
                    message : 'Image uploaded successfully'
                };
                return res.send(successJson);
            }
        });
    });
    Router.post('/postFollowing',function (req,res) {
        postFollowingController.onPostFollowing(req,res);
    });
    Router.post('/uploadPost',function (req,res) {
        createNewPostController.createNewPost(req,res);
    });
    Router.post('/getUserProfilePosts',function (req,res) {
        getUserProfilePostsController.getUserProfilePosts(req,res);
    });
    Router.post('/getNewsFeedPosts',function (req,res) {
        getNewsFeedProfilePostsController.getNewsFeedPosts(req,res);
    });
    Router.post('/getFollowingUsers',function (req,res) {
       getFollowinggUsersController.getFollowingUsers(req,res);
    });
    Router.post('/getFollowedUsers',function (req,res) {
        getFollowedUsersController.getFollowedUsers(req,res);
    });
    Router.post('/likePost',function (req,res) {
        likePostController.likePost(req,res);
    });
    Router.post('/getUserInitConfig',function (req,res) {
        getUserInitConfigController.getInitConfig(req,res);
    });
    Router.post('/addProfession',function (req,res) {
        addProfessionController.addProfession(req,res);
    });
    Router.post('/getProfessionForUserId',function (req,res) {
        getProfessionForUserIdController.getProfession(req,res);
    });
    Router.post('/updateBio',function (req,res) {
        updateBioController.updateBio(req,res);
    });
    Router.post('/unlikePost',function (req,res) {
        unlikePostController.unlikePost(req,res);
    });
    Router.get('/getAllUserInfo',function (req,res) {
        getAllUserInfoController.getAllUser(req,res);
    });
    Router.get('/queryBasedUserSearch',function (req,res) {
        queryBasedUserSearchController.queryBasedSearch(req,res);
    });
    Router.post('/postComment',function (req,res) {
       CollectiveCommentController.addComment(req,res);
    });
    Router.get('/getPostInfo',function (req,res) {
       getPostController.getPostInfo(req,res);
    });
    module.exports=Router;
})();
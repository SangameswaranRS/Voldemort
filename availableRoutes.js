(function () {
    var express=require('express');
    var Router=express.Router();
    var getImageController=require('./Controllers/getImageController');
    var postFollowingController=require('./Controllers/postFollowingController');
    var createNewPostController=require('./Controllers/createNewPostController');
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
    module.exports=Router;
})();
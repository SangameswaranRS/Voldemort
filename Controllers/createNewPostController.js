(function () {
    var createNewPostDao=require('../DataAccessObject/createNewPostDAO');
    module.exports.createNewPost=function (req,res) {
        var userId=req.body.userId;
        var encodedImage=req.body.encodedImage;
      if(encodedImage ===undefined){
          //no image in post.
          var jsonBody={
              likeCount :0,
              commentCount :0,
              postContent : req.body.postContent,
              postTime : Date.now(),
              imageUrl : 'IMG_NIL'
          };
          createNewPostDao.createNewPostEntry(jsonBody,0,userId,null,function (err,data) {
             if(err){
                 console.log(err);
                 var failureJson={
                     statusCode : 500,
                     message : 'Failed to upload post, Try again'
                 };
                 res.status(500).send(failureJson);
             } else{
                 //HTTP : 201 Created
                 var successJson={
                     statusCode :200,
                     message :'Post Created successfully'
                 };
                 res.status(200).send(successJson);
             }
          });
      }
      else{
          //post has image included in it
          var jsonBody1={
              likeCount :0,
              commentCount :0,
              postContent : req.body.postContent,
              postTime : Date.now(),
              imageUrl : 'IMG_NIL'
          };
          console.log('Image post');
          createNewPostDao.createNewPostEntry(jsonBody1,1,userId,encodedImage,function (err,data) {
              if(err){
                  console.log(err);
                  var failureJson={
                      statusCode : 500,
                      message : 'Failed to upload post, Try again'
                  };
                  res.status(500).send(failureJson);
              } else{
                  //HTTP : 201 Created
                  var successJson={
                      statusCode :200,
                      message :'Post Created successfully'
                  };
                  res.status(200).send(successJson);
              }
          });
      }
    };
})();
(function () {
    var connection=require('../Connection/connection');
    var imageHandler=require('../Controllers/imageHandler');
    module.exports.createNewPostEntry=function (jsonBody,hasImageFlag,userId,encodedImage,callBack) {
        if(hasImageFlag===0) {
            connection.beginTransaction(function (err) {
               if(err){
                   connection.rollback(function () {
                      callBack(err,null);
                   });
               } else{
                   connection.query('insert into postinfo set ?', jsonBody, function (err, data) {
                       console.log(data);
                       var postId=data.insertId;
                       if(postId !==undefined){
                            connection.query('insert into usertopostmap values(?,?)',[userId,postId],function (err,data) {
                               if(err){
                                   connection.rollback(function () {
                                      callBack(err,null);
                                   });
                               } else{
                                   connection.commit(function (err) {
                                      if(err){
                                          connection.rollback(function () {
                                             callBack(err,null);
                                          });
                                      } else{
                                         callBack(null,data);
                                      }
                                   });
                               }
                            });
                       }else{
                           connection.rollback(function () {
                              callBack('404',null);
                           });
                       }
                   });
               }
            });
        }
        else{
            connection.beginTransaction(function (err) {
               if(err){
                   connection.rollback(function () {
                       callBack(err,null);
                   });
               } else{
                    connection.query('insert into postinfo set ?',jsonBody,function (err,data) {
                       if(err){
                           connection.rollback(function () {
                              callBack(err,null);
                           });
                       } else{
                           var postId=data.insertId;
                           var imageParam={
                               postId :postId,
                                img : encodedImage
                           };
                           imageHandler.uploadImage(imageParam,function (err,path) {
                              if(err){
                                  connection.rollback(function () {
                                     callBack(err,null);
                                  });
                              } else{
                                  console.log('Image stored successfully in path : '+path);
                                  connection.query('update postinfo set imageUrl=? where postId=?',[path,postId],function (err,data) {
                                     if(err){
                                         connection.rollback(function () {
                                             callBack(err,null);
                                         });
                                     } else{
                                         console.log('Updating image URL Done');
                                         connection.query('insert into usertopostmap values(?,?)',[userId,postId],function (err,data) {
                                            if(err){
                                               connection.rollback(function () {
                                                   callBack(err,null);
                                               }) ;
                                            } else{
                                                connection.commit(function (err) {
                                                    if(err){
                                                        connection.rollback(function () {
                                                            callBack(err,null);
                                                        });
                                                    } else{
                                                        callBack(null,data);
                                                    }
                                                });
                                            }
                                         });
                                     }
                                  });
                              }
                           });
                       }
                    });
               }
            });
        }
    };
})();
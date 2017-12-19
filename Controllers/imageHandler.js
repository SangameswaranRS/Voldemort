(function () {
    var fs=require('fs');
    module.exports.uploadImage = function(data,callback){
        try{
            var name = data.postId+".jpg";
            var base64d = data.img.replace(/^data:image\/png;base64,/, "");
            var path = 'C://Users/Sangameswaran/profPics/'+name;
            fs.writeFile(path,base64d,'base64',function(err){
                callback(err,path);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.deleteImage = function(path,callback){
        try{
            fs.unlink(path,function (err) {
                callback(err);
            });
        }
        catch(err){
            callback(err);
        }
    };
})();
(function () {
    var sys=require('system');
    var exec=require('child_process').exec;
    module.exports.execBash=function (req,res) {
        var child;
        child = exec("ls -l ;cd middleware;ls -l", function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
                res.status(500).send(
                    {
                        statusCode:500,
                        message:error
                    }
                );
            }else {
                console.log(stdout);
                var response = {
                    statusCode: 200,
                    message: stdout
                };
                res.send(
                    response
                );
            }
        });
    }
})();
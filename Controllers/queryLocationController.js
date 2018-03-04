(function () {
    var PythonShell=require('python-shell');
    module.exports.getQueryBasedOnLocation=function (req,res) {
        var options = {
            mode: 'text',
            pythonPath: 'C:/Program Files/Python36/python.exe',
            pythonOptions: [],
            scriptPath: 'C:/Users/Sangameswaran/WebstormProjects/Voldemort/pythonScripts',
            args: [req.body.latitude,req.body.longitude]
        };
        console.log('Executing python script');
        PythonShell.run('queryPredictor.py', options, function (err, results) {
            if (err) throw err;
            var s=results.toString().replace('[','');
            var r=s.replace(']','');
            var p=r.replace('\r','');
            var successJson={
                statusCode : 200,
                prediction :p
            };
            res.send(successJson);
        });
    };
})();
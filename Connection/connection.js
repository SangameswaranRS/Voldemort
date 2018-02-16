var mysql=require('mysql');
var connection=mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password :'',
    database : 'voldemort',
    port : 3306
});
connection.connect(function (err,data) {
    if (err){
        console.log("Error connecting to database Error : "+err);
    }
    else{
        console.log('connected to database- Voldemort');
    }
});
module.exports=connection;
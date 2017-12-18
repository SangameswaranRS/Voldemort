(function () {
    var connection=require('../Connection/connection');
    var userId;
    module.exports.registerUser=function (userJson,callBack) {
        generateAccessToken(function (err,data) {
            var userToken=data;
            connection.beginTransaction(function (err) {
                if(err) {
                    callBack(err,userJson)
                }else {
                    connection.query('insert into user set ?', userJson, function (err, data) {
                        if (err) {
                            connection.rollback(function () {
                                callBack(err, data);
                            });
                        }
                        else {
                            connection.query('select userId from user where userName=?', userJson.userName, function (err, data) {
                                if (err) {
                                    connection.rollback(function () {
                                        callBack(err, data);
                                    });
                                }
                                else {
                                    if (data === undefined) {
                                        connection.rollback(function () {
                                            callBack(404, data);
                                        });
                                    }
                                    else {
                                        if (data.length > 0) {
                                            var data0 = data[0];
                                            userId = data0.userId;
                                            console.log(data);
                                            connection.query('insert into usertosessionmap values (?,?)', [userId, userToken], function (err, data) {
                                                if (err) {
                                                    connection.rollback(function () {
                                                        callBack(404, data);
                                                    });
                                                } else {
                                                    connection.commit(function (err) {
                                                        if (err) {
                                                            connection.rollback(function () {
                                                                callBack(404, data);
                                                            });
                                                        } else {
                                                            //commit success
                                                            callBack(null, userToken);
                                                        }
                                                    });
                                                }
                                            });
                                        } else {
                                            connection.rollback(function () {
                                                callBack(404, data);
                                            });
                                        }
                                    }
                                }
                            });
                        }

                    });
                }
            });
        });

    };
    var generateAccessToken=function (callBack) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        callBack(null,text);
    };
})();
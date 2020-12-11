const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


app.set('port', process.env.PORT || 3000);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use('/', express.static(path.join(__dirname, 'public')));


var connection = mysql.createConnection({
    host: "playerdb.cbygowk4eigm.us-east-2.rds.amazonaws.com",
    user: "admin",
    database: "player",
    password: "raon0378",
    port: 3306
});





app.post('/user/login', (req, res) => {

    let userEmail = req.body.userEmail;
    let userPwd = req.body.userPwd;
    
    let sql = 'select * from Users where UserEmail = ?';

    
    connection.query(sql, userEmail, (err, result) => {
        var resultCode = 404;
        var message = '에러가 발생했습니다';

        if (err) {
            console.log(err);
        } else {
            if (result.length === 0) {
                resultCode = 204;
                message = '존재하지 않는 계정입니다!';
            } else if (userPwd !== result[0].UserPwd) {
                resultCode = 204;
                message = '비밀번호가 틀렸습니다!';
            } else {
                resultCode = 200;
                message = '로그인 성공! ' + result[0].UserName + '님 환영합니다!';
            }
        }


        res.json({
            'code': resultCode,
            'message': message
        });
    })

    
})


app.post('/user/signup', (req, res) => {
    console.log(req.body);

    let userEmail = req.body.userEmail;
    let userBirth = req.body.userBirth;
    let userName = req.body.userName;
    let userPwd = req.body.userPwd;
    let userPhone = req.body.userPhone;


    var sql = 'INSERT INTO Users (UserEmail, userBirth, UserPwd, UserName) VALUES (?, ?, ?, ?)';
    var params = [userEmail, userBirth, userPwd, userName, userPhone];


    connection.query(sql, params, function (err, result) {
        var resultCode = 404;
        var message = '에러가 발생했습니다';

        if (err) {
            console.log(err);
        } else {
            resultCode = 200;
            message = '회원가입에 성공했습니다.';
        }

        res.json({
            'code': resultCode,
            'message': message
        });
    });
})


app.listen(3000, () => {
    console.log('서버 실행 중...');
});
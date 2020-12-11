const express = require("express");
const path = require("path");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');


//setting
dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(morgan('dev'));  //  개발환경은 dev 배포환경 combined
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




//middle ware
app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행');
    next();
})


app.use((err, req, res, next) => {
    console.error(err);
})




app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})
import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mysql from 'mysql2';
import session from 'express-session'
import bodyParser from 'body-parser'

import * as auth from './routes/auth.js';
import * as question from './routes/question.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const dataBase = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

dataBase.connect(function (err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    } else {
        console.log("DB connection created!");
    }
});

const app = express();
const port = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

app.use('/auth', auth.router);
app.use('/question', question.router);



app.listen(port, () => {
    console.log('Example app listening on port 3000!');
});

app.get('/', (req, res) => {
    dataBase.query(`SELECT * FROM questions`, (err, result) => {
        if (err) {
            console.log(err)
            res.sendStatus(500);
            console.log("error in app.js 64");
        } else {
            console.log(result);

            let userQuestions = undefined;
            if (req.session.userQuestions) {
                userQuestions = req.session.userQuestions;
            }

            let user = undefined;
            if(req.session.user){
                user = req.session.user;
            }

            res.render('index', { questions: result, user: user, userQuestions: userQuestions });
        }
    });
});

// phase 2
// phase 2
// phase 2
// phase 2
// phase 2
// phase 2
app.get('/auth/my-questions', (req, res) => {
    if(req.session.user){
        dataBase.query(`SELECT * FROM questions WHERE writer = ?`, [req.session.user.id], (err, result) => {
            if (err) {
                console.log(err)
                res.sendStatus(500);
            } else {
                // 사용자가 작성한 질문의 ID만 세션에 저장합니다.
                req.session.userQuestions = result.map(question => question.id);
                res.redirect('/');
            }
        });
    }
    else{
        res.redirect('/');
    }
});
// phase 2
// phase 2
// phase 2
// phase 2
// phase 2
// phase 2

app.get('/all-questions', (req, res) => {
    req.session.userQuestions = null; // userQuestions를 초기화합니다.
    res.redirect('/'); // 홈페이지로 리다이렉트합니다.
});

export default dataBase;
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

            if(req.session.user){
                res.render('index', { questions: result, user: req.session.user});
            }
            else{
                res.render('index', {questions: result, user: undefined})
            }
        }
    });
});

export default dataBase;
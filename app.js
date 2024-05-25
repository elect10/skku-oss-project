import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mysql from 'mysql2';

import * as auth from './routes/auth.js';
import * as question from './routes/question.js';
import * as answer from './routes/answer.js';

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

app.use('/auth', auth.router);
app.use('question', question.router);
app.use('/answer', answer.router);

app.listen(port, () => {
    console.log('Example app listening on port 3000!');
});

app.get('/', (req, res) => {
    //res.render('index');
    res.send('Hello World!')
});

export default dataBase;
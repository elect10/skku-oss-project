import express from 'express';
import path from 'path';

import * as auth from './routes/auth.js';
import * as question from './routes/question.js';
import * as answer from './routes/answer.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
import express from 'express';
import dataBase from '../app.js';
import { v4 as uuidv4 } from "uuid";
import { checkLogin } from "../middleware.js";

export const router = express.Router();

router.post('/', checkLogin, (req, res) => {
    const { title, content } = req.body;
    dataBase.query(`INSERT INTO questions (id, writer, title, content) `
        + `VALUES ('${uuidv4()}','${req.session.user.id}', '${title}', '${content}')`, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.redirect('/');
            }
        });
});

router.get('/:id', (req, res) => {
    dataBase.query('SELECT questions.id, questions.title, questions.content FROM questions ' +
        `WHERE questions.id = '${req.params.id}'`, (err, resultQ) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else {
                resultQ = resultQ[0];
                console.log("resQ: " + JSON.stringify(resultQ));
                dataBase.query('SELECT answers.content FROM questions ' +
                    'JOIN answers ON questions.id = answers.question_id ' +
                    `WHERE questions.id = '${req.params.id}'`, (err, resultA) => {
                        console.log(resultA);
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            console.log(resultA);
                            res.render('question', { question: resultQ, answers: resultA });
                        }
                    }
                );
            }
        }
    );
});

router.put('/:id', (req, res) => {
    dataBase.query(`UPDATE questions SET title = '${req.body.title}', content = '${req.body.content}' WHERE id = ${req.params.id}`, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send(result);
        }
    });
    res.send('/:id');
});

router.post('/:id/answer', checkLogin, (req, res) => {
    const questionId = req.params.id;
    const { content } = req.body;

    dataBase.query(`INSERT INTO answers (id, writer, question_id, content) `
        + `VALUES ('${uuidv4()}','${req.session.user.id}', '${questionId}', '${content}')`, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.redirect(`/question/${questionId}`);
            }
        });
})





import express from 'express';
import dataBase from '../app.js';

export const router = express.Router();

router.post('/', (req, res) => {
    res.send('question');
});

router.get('/:id', (req, res) => {
    dataBase.query(`SELECT * FROM questions WHERE id = ${req.params.id}`, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send(result);
        }
    });
});

router.delete('/:id', (req, res) => {
    dataBase.query(`DELETE FROM questions WHERE id = ${req.params.id}`, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send(result);
        }
    });
    res.send('/:id');
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





import express from 'express';

export const router = express.Router();

router.post('/', (req, res) => {
    res.send('question');
});

router.get('/:id', (req, res) => {
    res.send('answer/:id');
});

router.delete('/:id', (req, res) => {
    res.send('answer/:id');
});

router.put('/:id', (req, res) => {
    res.send('answer/:id');
});
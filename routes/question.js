import express from 'express';

export const router = express.Router();

router.post('/', (req, res) => {
    res.send('question');
});

router.get('/:id', (req, res) => {
    res.send('question/:id');
});

router.delete('/:id', (req, res) => {
    res.send('/:id');
});

router.put('/:id', (req, res) => {
    res.send('/:id');
});





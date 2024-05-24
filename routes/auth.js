import express from 'express';

export const router = express.Router();

router.get('/signup', (req, res) => {
    res.send('signup');
});

router.post('/login', (req, res) => {
    res.send('login');
});

// 추가 구현 사항
router.get('/login/github', (req, res) => {
    res.send('login/github');
});
import express from 'express';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import dataBase from '../app.js';

export const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', (req, res) => {
    const id = uuidv4();
    const { email, nickname, password } = req.body;
    const type = 'service';
    const salt = 'salt';
    const passwordHash = crypto.createHash('sha256').update(password + salt).digest('base64');
    dataBase.query(`INSERT INTO users (id, email, nickname, password, type, salt) VALUES ('${id}','${email}', '${nickname}', '${passwordHash}', '${type}', '${salt}')`, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.redirect('/auth/login');
        }
    });
    res.sendStatus(200);
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    dataBase.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            if(result.length === 0) {
                res.send('no such user');
            }
            const dbHash = crypto.createHash('sha256').update(result.password + result.salt).digest('base64');
            const inputHash = crypto.createHash('sha256').update(password + result.salt).digest('base64');
            if (dbHash === inputHash) {
                res.redirect('/');
            } else {
                res.send('password is wrong');
            }
        }
    });
});

// 추가 구현 사항
router.get('/login/github', (req, res) => {
    res.send('login/github');
});
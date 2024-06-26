import express from "express";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import dataBase from "../app.js";
import { saltGenerator } from "../utils.js";


export const router = express.Router();

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", (req, res) => {
    const id = uuidv4();
    console.log("signup");
    console.log(req.body);
    const { email, nickname, password } = req.body;
    dataBase.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        (err, result) => {
            if (err) {
                res.sendStatus(500);
                console.log("error in auth.js 24");
            } else {
                if (result.length == 0) {
                }
            }
        }
    );
    const salt = saltGenerator();
    console.log("salt: " + salt);
    const passwordHash = crypto
        .createHash("sha256")
        .update(password + salt)
        .digest("base64");
    dataBase.query(
        `INSERT INTO users (id, email, nickname, password, salt) ` +
        `VALUES ('${id}','${email}', '${nickname}', '${passwordHash}', '${salt}')`,
        (err, result) => {
            console.log(result);
            if (err) {
                res.sendStatus(500);
                console.log("error in auth.js 44");
            } else {
                res.redirect('/auth/login')
            }
        }
    );
});

router.get("/login", (req, res) => {
    res.render("login");
});
// phase 2
// phase 2
// phase 2
// phase 2
// phase 2
// phase 2

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("login");
    console.log(req.body);
    dataBase.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        (err, result) => {
            if (err) {
                res.sendStatus(500);
                console.log("error in auth.js 65");
            } else {
                if (!result || result.length === undefined || result.length === 0) {

                    res.redirect("/");
                    return;
                    // 로그인 실패시 서버 죽는 문제 해결
                }
                result = result[0];
                console.log(result);
                const inputHash = crypto
                    .createHash("sha256")
                    .update(password + result.salt)
                    .digest("base64");
                if (result.password === inputHash) {
                    req.session.user = {
                        id: result.id,
                        nickname: result.nickname
                    };
                    res.redirect("/");
                } else {
                    res.send("password is wrong");
                }
            }
        }
    );
});
// phase 2
// phase 2
// phase 2
// phase 2
// phase 2
// phase 2
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

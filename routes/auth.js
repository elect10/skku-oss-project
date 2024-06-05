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
            } else {
                res.sendStatus(200);
            }
        }
    );
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("login");
    console.log(req.body);
    dataBase.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        (err, result) => {
            result = result[0];
            console.log(result);
            if (err) {
                res.sendStatus(500);
            } else {
                if (!result) {
                    res.send("no such user");
                }
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

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbConfig = require('../models/dbconfig');
var pool = mysql.createPool(dbConfig.mysql);
var userInfo = require('../models/server/userinfo');


router.get('/', async function (req, res, next) {
    let userid = req.session.userid;
    if (userid) {
        let user = {};
        const connection = await(() => {
            return new Promise((resolve, reject) => {
                pool.getConnection((err, connection) => {
                    resolve(connection);
                })
            })
        })();

        const result1 = await(() => {
            return new Promise((resolve, reject) => {
                connection.query(userInfo.selectUser, [userid], (err, result) => {
                    resolve(result);
                })
            })
        })();
        user.userMsg = JSON.stringify(result1);
        user.userMsg = JSON.parse(user.userMsg)
        res.render('msg_atvt', { user: user});
    } else {
        res.redirect('/');
    }
});
module.exports = router;


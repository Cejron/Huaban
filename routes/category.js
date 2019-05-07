var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbConfig = require('../models/dbconfig');
var pool = mysql.createPool(dbConfig.mysql);
var loginPage = require('../models/server/loginpage');

router.get('/',async function (req, res, next) {
    var category = req.body.category;
    console.log(category)
    const connection = await (() => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                resolve(connection);
            })
        })
    })();
    const result1 = await (() => {
        return new Promise((resolve, reject) => {
            connection.query(loginPage.selectCategory, (err, result) => {
                resolve(result);
            })
        })
    })();
    const result2 = await (() => {
        return new Promise((resolve, reject) => {
            connection.query(loginPage.selectByCategory,[category] ,(err, result) => {
                resolve(result);
            })
        })
    })();
    console.log(result2)
    Pins = result1.map(item => ({
        ...item,
        pin: result2.filter(item2 => item2.pin_category === item.pin_category)
    }))
    console.log(Pins)
    res.render('category',{Pins:Pins});
});
module.exports = router;
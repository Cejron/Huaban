var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbConfig = require('../models/dbconfig');
var userInfo = require('../models/server/userinfo');
var pool = mysql.createPool(dbConfig.mysql);

router.get('/', async function (req, res, next) {
  let userid = req.session.userid;
  // console.log(req.session)
  if (userid) {
    let user = {};
    // console.log(user);

    const connection = await (() => {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          resolve(connection);
        })
      })
    })();

    const result1 = await (() => {
      return new Promise((resolve, reject) => {
        connection.query(userInfo.selectUser, [userid], (err, result) => {
          resolve(result);
        })
      })
    })();

    const result2 = await (() => {
      return new Promise((resolve, reject) => {
        connection.query(userInfo.selectPins, [userid], (err, result) => {
          resolve(result);
        })
      })
    })();
    user.userMsg = JSON.stringify(result1);
    user.userMsg = JSON.parse(user.userMsg)
    user.userPins = JSON.stringify(result2);
    user.userPins = JSON.parse(user.userPins)
    user.userPins=user.userPins.reverse();

    res.render('index',{user:user});
    // res.json(user)

  } else {
    res.redirect('/');
  }

});
module.exports = router;
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbConfig = require('../models/dbconfig');
var userInfo = require('../models/server/userinfo');
var pool = mysql.createPool(dbConfig.mysql);

router.get('/', async function (req, res, next) {
  let userid = req.session.userid;
  if (userid) {
    let user = {};
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
        connection.query(userInfo.selectBoardCategory, [userid], (err, result) => {
          resolve(result);
        })
      })
    })();
    const result3 = await (() => {
      return new Promise((resolve, reject) => {
        connection.query(userInfo.selectBoardPins, [userid], (err, result) => {
          resolve(result);

        })
      })
    })();
  //  console.log(result3)
    let Board = [];

    Board=result2.map(item => ({
      ...item,
      pin:result3.filter(item2 => item2.board_id===item.id)
    }))
    // Board.reverse();
    // console.log(Board)
    // console.log(Board[0].pin[0].pin_img)




    user.userMsg = JSON.stringify(result1);
    user.userMsg = JSON.parse(user.userMsg)
    res.render('mine', { user: user,Board:Board});

  } else {
    res.redirect('/');
  }

})
module.exports = router;
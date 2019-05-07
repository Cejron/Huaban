var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbConfig = require('../models/dbconfig');
var userInfo = require('../models/server/userinfo');
var loginCheck = require('../models/server/logincheck');
var pool = mysql.createPool(dbConfig.mysql);
router.post('/saveUser', function (req, res, next) {
    let msg=[];
    pool.getConnection(function (err, connention) {
        var data = req.body;
        var id = data.id;
        var user_name = data.user_name;
        var user_city = data.user_city;
        var user_sex = data.user_sex;
        var description = data.description;
        connention.query(userInfo.updateUser, [user_name, user_city, user_sex, description, id], function (err, result) {
            if (err) {
                throw err
            } else {
                msg.push({ state0: 200, msg: 'ok' });
            }
        });
        connention.query(userInfo.updateUserName, [user_name, id], function (err, result) {
            if (err) {
                throw err
            } else {
                msg.push({ state1: 200, msg: 'ok' });
            }
        });
        connention.release();

    });
    res.send(msg);
});
router.post('/savePass',async function (req, res, next) {

    var data = req.body;
    var user_id = data.user_id;
    var old_pass = data.old_pass;
    var new_pass = data.new_pass;
    var confirm_pass = data.confirm_pass;

    const connection = await (() => {
        return new Promise((resolve, reject) => {
          pool.getConnection((err, connection) => {
            resolve(connection);
          })
        })
      })();
  
      const result1 = await (() => {
        return new Promise((resolve, reject) => {
          connection.query(loginCheck.selectPass, [user_id], (err, result) => {
            resolve(result);
          })
        })
      })();
      console.log(result1)
      if(old_pass===result1[0].user_password){
        if(new_pass===confirm_pass){
            pool.getConnection(function(err,connection){
                connection.query(userInfo.updatePassword,[new_pass,user_id],function(err,result){
                    if (err) {
                        throw err
                    } else {
                        res.send({'state':1,'msg':'密码修改成功'});
                    }
                });
                connection.release();
            });
        }else{
            res.send({'state':2,'msg':'两次密码不一致！'});
        }
      }else{
          res.send({'state':0,'msg':'初始密码错误！'});
      }
});
module.exports = router;
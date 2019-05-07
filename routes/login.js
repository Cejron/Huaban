var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbConfig = require('../models/dbconfig');

var loginPage = require('../models/server/loginpage');
var pool = mysql.createPool(dbConfig.mysql);
/* GET home page. */

router.get('/',async function (req, res, next) {
  let Pins=[];
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
      connection.query(loginPage.selectGroupByCategory, (err, result) => {
        resolve(result);
      })
    })
  })();
  // for(var i=0;i<result2.length;i++){
  //   result2[i].pin=result2[i].pin.reverse();
  // }
  Pins=result1.map(item => ({
    ...item,
    pin:result2.filter(item2 => item2.pin_category===item.pin_category)
  }))
  
  res.render('login',{Pins:Pins});
  // pool.getConnection(function(err,connection){
  //   connection.query(loginPage.selectAll,function(err,result){
  //     if(err){
  //       throw err;
  //     }else{
  //       // console.log(result)
  //       // res.send(result);
  //       var pins={};
  //       pins.nature=[];
  //       pins.photo=[];
  //       pins.inset=[];
  //       pins.human=[];
  //       pins.UI=[];
  //       pins.food=[];
  //       pins.idea=[];
  //       pins.art=[];
  //       pins.furniture=[];
  //       pins.wedding=[];
  //       pins.dress=[];
  //       pins.industry=[];

  //       for(var i=0;i<result.length;i++){
  //         switch (result[i].pin_category) {
  //           case '自然':
  //             pins.nature.push(result[i].pin_img);
  //             break;
  //             case '摄影':
  //             pins.photo.push(result[i].pin_img);
  //             break;
  //             case '插画':
  //             pins.inset.push(result[i].pin_img);
  //             break;
  //             case '人像':
  //             pins.human.push(result[i].pin_img);
  //             break;
  //             case 'UI':
  //             pins.UI.push(result[i].pin_img);
  //             break;
  //             case '美食':
  //             pins.food.push(result[i].pin_img);
  //             break;
  //             case '创意':
  //             pins.idea.push(result[i].pin_img);
  //             break;
  //             case '艺术':
  //             pins.art.push(result[i].pin_img);
  //             break;
  //             case '家居':
  //             pins.furniture.push(result[i].pin_img);
  //             break;
  //             case '婚礼':
  //             pins.wedding.push(result[i].pin_img);
  //             break;
  //             case '女装/搭配':
  //             pins.dress.push(result[i].pin_img);
  //             break;
  //             case '工业设计':
  //             pins.industry.push(result[i].pin_img);
  //             break;
  //           default:
  //             break;
  //         }
  //       }

  //       pins.nature=pins.nature.reverse();
  //       pins.photo=pins.photo.reverse();
  //       pins.inset=pins.inset.reverse();
  //       pins.human=pins.human.reverse();
  //       pins.UI=pins.UI.reverse();
  //       pins.food=pins.food.reverse();
  //       pins.idea=pins.idea.reverse();
  //       pins.art=pins.art.reverse();
  //       pins.furniture=pins.furniture.reverse();
  //       pins.wedding=pins.wedding.reverse();
  //       pins.dress=pins.dress.reverse();
  //       pins.industry=pins.industry.reverse();

        
  //       res.render('login',{pins:pins});
  //       // res.json({pins:pins})

  //     }
  //   });
  // });
});


var loginCheck = require('../models/server/logincheck');
router.post('/login', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    var param = req.body;

    connection.query(loginCheck.selectUser, [param.act,param.pass], function (err, result) {
      if (err) {
        throw err;
      } else {
        if (result.length > 0) {
          req.session.userid=result[0].id;
          req.session.username = param.act;
          // console.log(req.session.userid)
          res.send(JSON.stringify({state:'200',msg:'登录成功！'}));
          // res.render('index', { pins: result });
        } else {
          res.send(JSON.stringify({ state: '101', msg: '该账号或密码错误！' }));
        }
      }


    });
    connection.release();
  });
  //  res.send('数据');


});

module.exports = router;

var express=require('express');
var router=express.Router();

var mysql=require('mysql');
var dbConfig = require('../models/dbconfig');
var pool = mysql.createPool(dbConfig.mysql);
var loginPage = require('../models/server/loginpage');
var userInfo=require('../models/server/userinfo');


router.get('/', function(req, res, next) {
  pool.getConnection(function(err,connection){
    connection.query(loginPage.selectAll,function(err,result){

        res.json({pins:result.reverse()});
    });
    connection.release();
  });
});
module.exports=router;


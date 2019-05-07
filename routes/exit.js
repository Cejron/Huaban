var express=require('express');
var router=express.Router();

router.get('/', function(req,res,next){
    req.session='';
    console.log(req.session)
    res.redirect('/');
})
module.exports=router;
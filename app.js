var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session=require('express-session');

var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
var mineRouter = require('./routes/mine');
var settingRouter = require('./routes/setting');
var dataRouter = require('./routes/data');
var exitRouter = require('./routes/exit');
var saveRouter = require('./routes/save');
var msg_atvtRouter = require('./routes/msg_atvt');
var search_unloginRouter = require('./routes/search_unlogin');
var search_loginRouter = require('./routes/search_login');
var categoryRouter = require('./routes/category');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//新添加
app.use(session({
  secret :  'secret', 
  resave : false,
  saveUninitialized: false, 
  cookie : {
      maxAge : 1000 * 60 * 10 * 10, 
  },
}));

//新添加

app.use('/', loginRouter);
app.use('/index', indexRouter);
app.use('/mine', mineRouter);
app.use('/setting', settingRouter);
app.use('/data', dataRouter);
app.use('/exit', exitRouter);
app.use('/save', saveRouter);
app.use('/msg_atvt', msg_atvtRouter);
app.use('/search_unlogin', search_unloginRouter);
app.use('/search_login', search_loginRouter);
app.use('/category', categoryRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

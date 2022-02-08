var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var multer = require('multer');
var path = require('path');

global.fetch = require('cross-fetch');
global.upload = multer();

global.faceapi = require("@vladmandic/face-api");
loadModels();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk("./public/weights");
  await faceapi.nets.tinyFaceDetector.loadFromDisk("./public/weights");
  await faceapi.nets.faceLandmark68Net.loadFromDisk("./public/weights");
  await faceapi.nets.faceLandmark68TinyNet.loadFromDisk("./public/weights");
  await faceapi.nets.faceRecognitionNet.loadFromDisk("./public/weights");
}

module.exports = app;

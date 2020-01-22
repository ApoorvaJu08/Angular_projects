var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose');
var passport = require('passport');
var auth = require('./routes/auth');
var category = require('./routes/category');
var post = require('./routes/post');

var app = express();

app.use(passport.initialize());

app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/auth', auth);
// app.use('/api/public/category', category);

// here you define the path for reaching to your category api
//  and then again you are adding the same routes


app.use('/api/category', category);
app.use('/api/post', post);


mongoose.connect('mongodb://localhost:27017/blog-cms', {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

module.exports = app;

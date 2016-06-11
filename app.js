var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var MongoStore = require('connect-mongo')(session);
var configDB = require('./config/database.js');



app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/templates', express.static(__dirname + '/views/templates/'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(configDB.url);
require('./config/passport')(passport);
app.use(session({secret: 'string of text',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection,
        ttl: 2 * 24 * 60 * 60})}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/routes.js')(app, passport);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');
var util = require('util');
var partials = require('express-partials');
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);


//mongo
// var mongo = require('mongodb');
// var monk = require('monk');
// var db = monk(config.get('mongo.uri'));

var index = require('./routes/index');
// var profiles = require('./routes/profiles');
// var api = require('./routes/api');
// var widgets = require('./routes/widgets');
// var meetup = require('./routes/meetup');
// var linkedin = require('./routes/linkedin');
// var github = require('./routes/github');
// var stackoverflow = require('./routes/stackoverflow');
// var google = require('./routes/google');
// var admin = require('./routes/admin');
// var bitbucket = require('./routes/bitbucket');

///*
// * Passport stuff
// */
//var passport = require('passport');
//var GoogleStrategy = require('passport-google-oauth2').Strategy;
//var GitHubStrategy = require('passport-github2').Strategy;
//
//passport.serializeUser(function(user, done) {
//	done(null, user);
//});
//
//passport.deserializeUser(function(obj, done) {
//	done(null, obj);
//});
//passport.use(new GoogleStrategy({
//	  clientID: config.get('google.client_id'),
//	  clientSecret: config.get('google.client_secret'),
//	  callbackURL: 'http://' + config.get('google.redirect_domain') + '/google/authorized',
//	  passReqToCallback: true
//	  },
//	  function(request, accessToken, refreshToken, profile, done) {
//	    process.nextTick(function () {
//console.log('profile is: ' + util.inspect(profile));
//	      return done(null, profile);
//	    });
//	  }
//	));
//
//passport.use(new GitHubStrategy({
//	clientID: config.get('github.client_id'),
//	clientSecret: config.get('github.client_secret'),
//	callbackURL: config.get('github.callback')
//},
//function(accessToken, refreshToken, profile, done) {
//	console.log('github ret is %s',util.inspect(profile))
//    // asynchronous verification, for effect...
//	var users = db.get('users');
////	users.findAndModify({'github.username': profile.username},{$set:{}})
//
//	return done(null, profile);
//}));




var app = express();


// app.use(session({
// 	secret: config.get('app.cookie_secret'),
// 	resave: false,
// 	saveUninitialized: false,
// 	store: new MongoStore({
// 		url: config.get('mongo.uri'),
// 		autoReconnect: true
// 	})
// }));




app.use(partials());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(passport.initialize());
//app.use(passport.session());

// app.use(function(req,res,next){
//     req.db = db;
// //    req.passport = passport;
//     next();
// });


app.use('/', index);
// app.use('/', users);
// app.use('/profiles', profiles);
// app.use('/api', api);
// app.use('/widgets', widgets);
// app.use('/github', github);
// app.use('/linkedin', linkedin);
// app.use('/stackoverflow', stackoverflow);
// app.use('/meetup', meetup);
// app.use('/google', google);
// app.use('/admin', admin);
// app.use('/bitbucket', bitbucket);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
console.log('env is: ' + app.get('env'));

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator=require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHandleBars= require('express-handlebars');
var flash= require('connect-flash');
var session= require('express-session');
var passport= require('passport');
var mongoose= require('mongoose');


var configDB= require('./config/db.js');
mongoose.connect(configDB.url);


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',expressHandleBars({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Pour les sessions
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));


// ********************Pour les messages flsh
// Crée une variable globale "messages" qui peut etre utilisée dans les vues !
//EXEMPLE
//Adding Messages
//
//On the server:
//
//req.flash("info", "Email queued");
//req.flash("info", "Email sent");
//req.flash("error", "Email delivery failed");
//
app.use(require('connect-flash')());
app.use(function (req, res, next) {
	res.locals.messages = require('express-messages')(req, res);
	next();
});
// ********************Pour les messages flsh
//FIN

// Se charge des erreurs de validation
// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
			, root    = namespace.shift()
			, formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg   : msg,
			value : value
		};
	}
}));

app.use('/', routes);
app.use('/users', users);

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

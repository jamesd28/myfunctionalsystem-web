// Dependency variables
var express = require('express'),
	morgan = require('morgan'),
	helmet = require('helmet'),
	bodyparser = require('body-parser');

// Application Dependencies.
var db = require('./app/database');

// Webserver (express) initialization.
var	app = express();

// Webserver Configuration.
app.use(bodyparser.json()); // Parse POST data.
app.use(morgan('dev')); // Console Logging
app.use(helmet()); // Security :D


// Passport Initialization / Configuration
var passport = require('./app/authorization')(app, db);

app.post('/auth/login', function(req, res, next){
	console.log(req.body);
	next();
},passport.authenticate('login', {
	successRedirect: '/auth/login/success',
	failureRedirect: '/auth/login/failure'
}));

// Routes
app.get('/', function(req, res){
	res.sendStatus(401).end();
});

require('./app/controllers')(app, db);

// Start listening.
db.database.sync({force: true}).then(function(){
	db.seed();
// db.database.sync().then(function(){
	app.listen(3000);
});
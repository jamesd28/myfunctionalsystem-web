// Dependency variables
var express = require('express'),
	morgan = require('morgan'),
	helmet = require('helmet'),
	bodyparser = require('body-parser'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

// Application Dependencies.
var db = require('./app/database');

// Webserver (express) initialization.
var	app = express();

// Webserver Configuration.
app.use(bodyparser.json()); // Parse POST data.
app.use(morgan('dev')); // Console Logging
app.use(helmet()); // Security :D

// Passport Configuration
app.use(passport.initialize()); // Authentication.
app.use(passport.session());
passport.serializeUser(function(user, done){
	done(null, user.id);
});
passport.deserializeUser(function(id, done){
	db.Person.findById(id).then(function(person){
		done(null, person);
	}).catch(function(err){
		done(err, null);
	});
});

passport.use('login', new LocalStrategy({
	usernameField: 'netid',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, netid, password, done){
	console.log(netid);
	db.Person.findOne({
		where: {
			netID: netid
		}
	}).then(function(person){
		console.log(person);
		if (!person || !person.validPassword(password)){
			return done(null, false); // User does not exist, or the password is invalid.
		}
		return done(null, person);
	}).catch(function(error){
		return done(error);
	});
}));

app.post('/auth/login', passport.authenticate('login', {
	successRedirect: '/auth/login/success',
	failureRedirect: '/auth/login/failure'
}));

// Routes
app.get('/', function(req, res){
	res.sendStatus(200).end();
});

// app.get('/auth/setpass/:id/:password', function(req, res){
// 	db.Person.findById(req.params.id).then(function(person){
// 		person.setPassword(req.params.password);
// 	}).catch(function(err){
// 		console.log(err);
// 	});
// });

// Start listening.
db.database.sync().then(function(){
	app.listen(3000);
});
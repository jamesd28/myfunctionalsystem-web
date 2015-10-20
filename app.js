// Dependency variables
var express = require('express'),
	morgan = require('morgan'),
	helmet = require('helmet');

// Webserver (express) initialization.
var	app = express();

// Webserver Configuration.
app.use(morgan('dev')); // Console Logging
app.use(helmet()); // Security :D

// Routes
app.get('/', function(req, res){
	res.sendStatus(200).end();
});

// Start listening.
app.listen(8080);
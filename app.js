// Dependency variables
var express = require('express'),
	morgan = require('morgan');

// Webserver (express) initialization.
var	app = express();

// Webserver Configuration.
app.use(morgan('dev'));

// Routes
app.get('/', function(req, res){
	res.sendStatus(200).end();
});

// Start listening.
app.listen(8080);
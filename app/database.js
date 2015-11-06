// Module Dependencies.
var Sequelize = require('sequelize'),
	config = require('../config/config.json'),
	fs = require('fs'),
	path = require('path');

var db = {}; // Object for export.

// Connection Initialization.
var database = new Sequelize(config.dburl);

// Initialize Models.
fs
	.readdirSync(path.join(__dirname, 'models/'))
	.forEach(function(file){
		var model = database.import(path.join(__dirname, 'models/' + file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.database = database;

module.exports = db;
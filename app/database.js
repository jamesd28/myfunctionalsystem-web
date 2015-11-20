// Module Dependencies.
var Sequelize = require('sequelize'),
	config = require('../config/config.json'),
	fs = require('fs'),
	path = require('path');

var db = {}; // Object for export.

// Connection Initialization.
// var database = new Sequelize(config.dburl);
var database = new Sequelize(config.dburl, {logging: false});

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

module.exports.seed = function(){
	var term = db.Term.build({
		termID: 1000,
		termStart: '2015-09-09 00:00:00',
		termEnd: '2015-12-04 00:00:00',
		termName: 'Fall Term 2015'
	});
	var course = db.Course.build({
		code: 'CMPT',
		number: 305,
		title: 'Object-Oriented Programming',
		description: 'An exploration of objects (ie. Carrots, Apples, Cereal, and Shopping Lists)',
		career: 'UGRAD'
	});
	var class_ = db.Class.build({
		type: 'LEC'
	});

	term.save().then(function(term){
		course.setTerm(term);
		course.save().then(function(course){
			class_.setCourse(course);
			class_.save();
		});
	});

	var person = db.Person.build({
		firstName: 'Testy',
		lastName: 'McTesterson',
		password: '$2a$10$j0EmVPadU9ZD35h7vjYG.e8dJ2bhxCWKyWSHw6sn3QqDlYTn/Q66S',
		netID: 'test',
		birthDate: '1992-11-05 00:00:00'
	}).save().then(function(person){
		var enroll = db.Enrollment.build({
			grade: 'A+',
			role: 'STD'
		});
		enroll.setPerson(person);
		enroll.setClass(class_);
		enroll.save();
	});
}
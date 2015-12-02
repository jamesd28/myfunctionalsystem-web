module.exports = function(app, db){
	app.get('/coursecodes', function(req, res){
		db.database.query('SELECT DISTINCT(code) FROM Courses WHERE code NOT LIKE \'\' ORDER BY code;').spread(function(data){
			res.json(data);
		});
	});

	app.get('/courses', function(req, res){
		db.Course
			.findAll()
			.then(function(courses){
				res.json(courses);
			});
	});

	app.get('/courses/:code', function(req, res){
		db.Course
			.findAll({
				where: {
					code: req.params.code
				}
			})
			.then(function(courses){
				res.json(courses);
			});
	});

	app.get('/course/:id', function(req, res){
		db.Course
			.findById(req.params.id)
			.then(function(course){
				return res.json(course);
			});
	});

	app.get('/classes/:courseid', function(req, res){
		db.database.query('SELECT * FROM Classes WHERE CourseId = ' + db.database.getQueryInterface().escape(req.params.courseid) + ';').spread(function(data){
			res.json(data);
		});
	});
};
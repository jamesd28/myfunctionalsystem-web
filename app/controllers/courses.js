module.exports = function(app, db){
	app.get('/courses', function(req, res){
		db.Course
			.findAll()
			.then(function(courses){
				res.json(courses);
			});
	});
};
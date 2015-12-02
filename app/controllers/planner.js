var _ = require('underscore');

module.exports = function(app, db){
	app.post('/planner/add/:courseid', function(req, res){
		if (!req.user){
			res.sendStatus(401).end();
			return;
		}

		db.Person
			.findOne({
				where: {
					netID: req.user.netID
				}
			})
			.then(function(person){
				db.Course.findById(req.params.courseID)
					.then(function(course){
						db.Person.findById(req.user.id).then(function(person){
							db.Planner
								.create()
								.then(function(plan){
									plan.setCourse(course);
									plan.setPerson(person);
									res.sendStatus(200);
							}).catch(function(err){
								res.sendStatus(500);
							});
						}).catch(function(err){
							res.sendStatus(500);
						});
				}).catch(function(err){
					res.sendStatus(500);
				});
			});
	});

	app.post('/planner/delete', function(req, res){
		if (!req.user) {
			res.sendStatus(401).end();
		}

		db.database.query('DELETE * FROM Planners WHERE PersonId = ' + db.database.getQueryInterface().escape(req.user.id) + ' AND CourseId = ' + db.database.getQueryInterface().escape(req.body.CourseId) + ';').then(function(plan){
			res.sendStatus(200).end();
		}).catch(function(err){
			res.sendStatus(500).end();
		});
	});

	app.get('/planner', function(req, res){
		if (!req.user) {
			res.sendStatus(401).end();
		}

		// console.log('SELECT * FROM Planners WHERE PersonId = ' + db.database.getQueryInterface().escape(req.user.id));
		db.database.query('SELECT DISTINCT(CourseId) FROM Planners WHERE PersonId = ' + db.database.getQueryInterface().escape(req.user.id)).spread(function(data){
			// console.log(data);
			res.json(data);
		});
	});
}
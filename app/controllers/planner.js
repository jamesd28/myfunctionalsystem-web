var _ = require('underscore');

module.exports = function(app, db){
	app.post('/planner/add/:courseid', function(req, res){
		if (!req.user){
			res.sendStatus(401).end();
			return;
		}

		db.database.query('INSERT INTO Planners(`CourseId`, `PersonId`) VALUES ('+ req.params.courseid +', ' + req.user.id + ')').then(function(data){
			res.sendStatus(200).end();
		}).catch(function(err){
			res.sendStatus(500).end();
		});
	});

	app.post('/planner/delete/:courseid', function(req, res){
		if (!req.user) {
			res.sendStatus(401).end();
		}

		db.database.query('DELETE FROM Planners WHERE PersonId = ' + req.user.id + ' AND CourseId = ' + req.params.courseid + ';').then(function(plan){
			res.sendStatus(200).end();
		}).catch(function(err){
			res.sendStatus(500).end();
		});
	});

	app.get('/planner', function(req, res){
		if (!req.user) {
			res.sendStatus(401).end();
			console.log(req.user);
		}

		// console.log('SELECT * FROM Planners WHERE PersonId = ' + db.database.getQueryInterface().escape(req.user.id));
		db.database.query('SELECT * FROM Courses c INNER JOIN Planners p ON c.id = p.CourseId WHERE p.PersonId = ' + req.user.id + ' GROUP BY c.id;').spread(function(data){
			// console.log(data);
			res.json(data);
		});
	});
}
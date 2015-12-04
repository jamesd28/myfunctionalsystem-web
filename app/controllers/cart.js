module.exports = function(app, db){
	app.post('/cart/add/:classid', function(req, res){
		if (!req.user){
			res.sendStatus(401).end();
			return;
		}

		db.database.query("INSERT INTO `ShoppingCarts` (`PersonId`, `ClassId`) VALUES (" + req.user.id + ", "+ req.params.classid +");").then(function(){
			res.sendStatus(200).end();
		}).catch(function(err){
			res.sendStatus(500).end();
		});
	});

	app.post('/cart/delete/:classid', function(req, res){
		if (!req.user){
			res.sendStatus(401).end();
			return;
		}

		db.database.query("DELETE FROM `ShoppingCarts` WHERE PersonId = " + req.user.id + " AND ClassId = "+ req.params.classid +";").then(function(){
			res.sendStatus(200).end();
		}).catch(function(err){
			res.sendStatus(500).end();
		});
	});

	app.get('/cart/:termid', function(req, res){
		if (!req.user){
			res.sendStatus(401).end();
			return;
		}

		db.database.query("SELECT * FROM ShoppingCarts sc INNER JOIN Classes cl ON sc.ClassId = cl.id INNER JOIN Courses co ON cl.CourseId = co.id INNER JOIN Terms t on co.TermId = t.id WHERE sc.PersonId = " + req.user.id + " AND t.id = " + req.params.termid + " GROUP BY cl.id;").spread(function(data){
			res.json(data);
		}).catch(function(err){
			res.sendStatus(500).end();
		});
	});
}
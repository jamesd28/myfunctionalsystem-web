module.exports = function(app, db){
	app.post('/cart/add/:classid', function(req, res){
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
				db.Class.findById(req.params.classid)
					.then(function(class_){
						db.Person.findById(req.user.id).then(function(person){
							db.Cart
								.create()
								.then(function(cart){
									cart.setClass(class_);
									cart.setPerson(person);
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
}
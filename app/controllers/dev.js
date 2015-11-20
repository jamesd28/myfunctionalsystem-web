module.exports = function(app, db){
	app.get('/dev/setpass/:id/:password', function(req, res){
		db.Person.findById(req.params.id).then(function(person){
			person.setPassword(req.params.password);
		}).catch(function(err){
			console.log(err);
		});
	});
}
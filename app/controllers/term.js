module.exports = function(app, db){
	app.get('/terms', function(req, res){
		db.Term
			.findAll()
			.then(function(terms){
				res.json(terms);
			})
	});
}
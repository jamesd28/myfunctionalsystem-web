var fs = require('fs'),
	path = require('path');

module.exports = function(app, db){
	fs
		.readdirSync(__dirname)
		.forEach(function(file){
			if (file !== 'index.js') {
				require(path.join(__dirname, file))(app, db);
			}
		});
};
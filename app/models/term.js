module.exports = function(sequelize, DataTypes){
	var Term = sequelize.define('Term', {
		termID: DataTypes.INTEGER,
		termStart: DataTypes.DATE,
		termEnd: DataTypes.DATE,
		termName: DataTypes.TEXT
	}, {
		classMethods: {
			associate: function(models){
				Term.hasMany(models.Course, {as: 'Courses'});
			}
		}
	});

	return Term;
};
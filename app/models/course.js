module.exports = function(sequelize, DataTypes){
	var Course = sequelize.define('Course', {
		code: {type: DataTypes.STRING, allowNull: false},
		number: {type: DataTypes.INTEGER, allowNull: false},
		title: {type: DataTypes.STRING, allowNull: false},
		description: {type: DataTypes.TEXT},
		career: DataTypes.ENUM('DPLMA','UGRAD', 'GRAD')
	}, {
		classMethods: {
			associate: function(models){
				Course.hasMany(models.Class, {as: 'Classes'});
				Course.belongsToMany(models.Course, {as: 'Prerequisites', through: models.Prerequisite});
				Course.belongsTo(models.Term, {as: 'Term'});
				Course.hasMany(models.Planner);
			}
		}
	});

	return Course;
};
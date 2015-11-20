module.exports = function(sequelize, DataTypes){
	var Class = sequelize.define('Class', {
		type: {type: DataTypes.ENUM('LEC', 'LAB', 'SEM'), defaultValue: 'LEC'}
	}, {
		classMethods: {
			associate: function(models){
				Class.hasMany(models.Enrollment, {as: 'Enrollments'});
				Class.belongsTo(models.Course);
			}
		}
	});
	return Class;
}
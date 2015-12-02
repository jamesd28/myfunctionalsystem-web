module.exports = function(sequelize, DataTypes){
	var Class = sequelize.define('Class', {
		type: {type: DataTypes.ENUM('LEC', 'LAB', 'SEM'), defaultValue: 'LEC'},
		sectionNumber: {type: DataTypes.STRING},
		startTime: {type: DataTypes.DATE, allowNull: false},
		endTime: {type: DataTypes.DATE, allowNull: false},
		meetDates: {type: DataTypes.STRING} // MWF / TR / S
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
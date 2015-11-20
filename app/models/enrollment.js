module.exports = function(sequelize, DataTypes){
	var Enrollment = sequelize.define('Enrollment', {
		grade: {type: DataTypes.ENUM('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F', 'NYT','CIP', 'W'), defaultValue: 'NYT'},
		role: {type: DataTypes.ENUM('INS', 'STD'), defaultValue: 'STD'}
	}, {
		classMethods: {
			associate: function(models) {
				Enrollment.belongsTo(models.Person);
				Enrollment.belongsTo(models.Class);
			}
		}
	});

	return Enrollment;
};
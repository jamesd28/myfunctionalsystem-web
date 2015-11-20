module.exports = function(sequelize, DataTypes){
	var Prerequisite = sequelize.define('Prerequisite', {
		minimumGrade: DataTypes.ENUM('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D')
	});

	return Prerequisite;
};
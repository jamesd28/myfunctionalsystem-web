module.exports = function(sql, DataTypes){
	var Planner = sql.define('Planner', {

	}, {
		classMethods: {
			associate: function(models){
				Planner.belongsTo(models.Person);
				Planner.belongsTo(models.Course);
			}
		}
	});
	return Planner;
}
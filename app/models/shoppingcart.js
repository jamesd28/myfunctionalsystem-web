module.exports = function(sql, DataTypes){
	var ShoppingCart = sql.define('ShoppingCart', {

	}, {
		classMethods: {
			associate: function(models){
				ShoppingCart.belongsTo(models.Person);
				ShoppingCart.belongsTo(models.Course);
			}
		}
	});
	return ShoppingCart;
}
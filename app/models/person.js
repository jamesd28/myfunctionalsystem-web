var moment = require('moment'),
	bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes){
	var Person = sequelize.define("Person", {
		// Sequelize creates an ID field automagically.
		firstName: { type: DataTypes.STRING, allowNull: false },
		lastName: { type: DataTypes.STRING, allowNull: false },
		middleName: { type: DataTypes.STRING },
		preferredName: { type: DataTypes.STRING },
		birthDate: { type: DataTypes.DATE, allowNull: false },

		// Login Information.
		netID: { type: DataTypes.STRING, allowNull: false },
		password: { type: DataTypes.STRING, allowNull: false},
		lastLogin: {type: DataTypes.DATE, default: moment().format('YYYY-MM-DD HH:mm:ss')}
	}, {
		paranoid: true, // Don't hard delete anything. Instead set a deletedAt timestamp.
		instanceMethods: {
			validPassword: function(password) {
				return bcrypt.compareSync(password, this.password);
			},
			setPassword: function(password){
				this.password = bcrypt.hashSync(password);
				this.save();
			}
		},
		classMethods: {
			associate: function(models){
				Person.hasMany(models.Enrollment);
				Person.hasOne(models.Planner);
			}
		}
	});

	return Person;
};
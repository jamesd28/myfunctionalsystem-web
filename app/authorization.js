var moment = require('moment'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, db){
	app.use(passport.initialize()); // Authentication.
	app.use(passport.session());

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		db.Person.findById(id).then(function(person){
			done(null, person);
		}).catch(function(err){
			done(err, null);
		});
	});

	passport.use('login', new LocalStrategy({
		usernameField: 'netid',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, netid, password, done){
		// console.log(netid);
		db.Person.findOne({
			where: {
				netID: netid
			}
		}).then(function(person){
			// console.log(person);
			if (!person || !person.validPassword(password)){
				return done(null, false); // User does not exist, or the password is invalid.
			} else {
				person.lastLogin = moment().format('YYYY-MM-DD HH:mm:ss');
				return done(null, person);
			}
		}).catch(function(error){
			return done(error);
		});
	}));

	return passport;
}
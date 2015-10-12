var User = require("./authModel");
var Q = require("q");
var jwt = require("jsonwebtoken");

module.exports = {
	signin: function(req, res, next) {
		var username = req.body.username;
		var password = req.body.password;

		var findUser = Q.nbind(User.findOne, User);

		findUser({ username: username })
			.then(function (user) {
				if (!user) {
					next(new Error("User does not exist"));
				} else {
					return user.comparePasswords(password)
						.then(function(foundUser) {
							if (foundUser) {
								var token = jwt.sign(user, "SECRET", {
									expiresInMinutes: 1440
								});

								res.json({ token: token });
							} else {
								return next(new Error("No User"));
							}
						});
				}
			})
			.fail(function (error) {
				next(error);
			});

	},

	signup: function(req, res, next) {
		var username = req.body.username;
		var password = req.body.password;

		var findOne = Q.nbind(User.findOne, User);

		findOne({ username: username })
			.then(function(user) {
				if (user) {
					next(new Error("User already exists"));
				} else {
					var create = Q.nbind(User.create, User);

					var newUser = {
						username: username,
						password: password
					};

					return create(newUser);
				}
			})
			.then(function (user) {
				var token = jwt.sign(user, "SECRET", {
					expiresInMinutes: 1440
				});
				console.log(token);
				res.json({ token: token });
			})
			.fail(function (error) {
				next(error);
			});
	},

	checkAuth: function(req, res, next){

	}
};
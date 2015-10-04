var mongoose = require("mongoose");
var Q = require("q");
var bcrypt = require("bcryptjs");


var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

UserSchema.methods.comparePasswords = function(passwordAttempt) {
	var defer = Q.defer();
	var savedPassword = this.password;

	bcrypt.compare(passwordAttempt, savedPassword, function(err, isMatch) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(isMatch);
		}
	});
	return defer.promise;
};

UserSchema.pre("save", function (next) {
	var user = this;

	if (!user.isModified("password")) {
		return next();
	}

	bcrypt.hash(user.password, 10, function(err, hash) {
		if (err) {
			return next(err);
		}

		user.password = hash;
		next();
	});
});

module.exports = mongoose.model("users", UserSchema);



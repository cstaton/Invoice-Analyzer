var jwt = require("jsonwebtoken");

module.exports = {

	errorLogger: function(error, req, res, next) {
		console.error(error.stack);
		next(error);
	},

	errorHandler: function(error, req, res, next) {
		res.sendStatus(500);
	},

	decodeToken: function(req, res, next) {
		var token = req.headers['x-access-token'];
		console.log(token);

		if (!token) {
			return res.send(403);
		}

		jwt.verify(token, "SECRET", function(err, decoded) {
			if (err) {
				throw err;
			}
			console.log(decoded);
			req.user = decoded;
			next();
		});
	}
};
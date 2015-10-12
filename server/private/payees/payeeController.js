var Payee = require("./payeeModel");
var Q = require("q");

module.exports = {

	savePayee: function(req, res, next) {
		console.log("POST PAYEE ROUTE");
		var name = req.body.name;
		var address = req.body.address;
		var payeeType = req.body.payeeType;
		var placeId = req.body.placeId;
		var id = req.user._id;

		var createPayee = Q.nbind(Payee.create, Payee);

		var payee = {
			userId: id,
			name: name,
			address: address,
			payeeType: payeeType,
			placeId: placeId,
		};

		createPayee(payee)
			.then(function (createdPayee) {
				if (createdPayee) {
					res.json(createdPayee);
				} else {
					return next(new Error("Not a valid Payee"));
				}
			})
			.fail(function (error) {
				next(error);
			});
	},

	getPayees: function(req, res, next) {
		var findAll = Q.nbind(Payee.find, Payee);

		findAll({ userId: req.user._id })
			.then(function (payees) {
				res.json(payees);
			})
			.fail(function (error) {
				next(error);
			});
	}
};





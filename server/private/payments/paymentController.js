var Payment = require("./paymentModel");

module.exports = {
	savePayment: function(req, res) {
		console.log("***** BODY INFO *****");		
		console.log(req.body);
		console.log("***** USER INFO *****");
		console.log(req.user)

		Payment.create({
			vendorName: req.body.vendorName,
			invoiceNum: req.body.invoiceNum,
			payDate: req.body.paymentDate
		})
		.then(function (data) {
			res.json(data);
		});
	},

	getPayments: function(req, res) {
		Payment.find()
			.then(function (data) {
				res.json(data);
			});
	}
};
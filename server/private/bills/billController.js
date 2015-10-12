var Bill = require("./billModel");
var Q = require("q");

module.exports = {

	saveBill: function(req, res, next) {
		console.log("*********** Save Bill Route **********");
		var userId = req.user._id;
		var payeeId = req.body.payeeId;
		var dateDue = req.body.dateDue;
		var amount = req.body.amount;
		var invoiceNum = req.body.invoiceNum;

		var createBill = Q.nbind(Bill.create, Bill);

		var bill = {
			userId: userId,
			payeeId: payeeId,
			dateDue: dateDue,
			amount: amount,
			invoiceNum: invoiceNum
		};

		createBill(bill)
			.then(function (createdBill) {
				if (createdBill) {
					res.json(createdBill)
				} else {
					return next(new Error("Not a valid Bill"));
				}
			})
			.fail(function (error) {
				next(error);
			});
	},

	getBills: function(req, res, next) {
		console.log("GET BILLS CONTROLLER TEST");
		var findAll = Q.nbind(Bill.find, Bill);

		// console.log(req.query);
		// console.log(req.user._id);
		// console.log(req.params.payeeId);


		findAll({ 
			userId: req.user._id,
			payeeId: req.params.payeeId
		})
		.then(function (bills) {
			res.json(bills);
		})
		.fail(function (error) {
			next(error);
		});
	}
};


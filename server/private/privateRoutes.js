var payeeController = require("./payees/payeeController");
var billController = require("./bills/billController");
var paymentController = require("./payments/paymentController");

module.exports = function(app) {
	app.post("/payee", payeeController.savePayee);
	app.get("/payee", payeeController.getPayees);
	app.post("/bill", billController.saveBill);
	app.get("/bill/:payeeId", billController.getBills);
	app.get("/payment", paymentController.getPayments);
	app.post("/payment", paymentController.savePayment);
};
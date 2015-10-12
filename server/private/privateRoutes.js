var payeeController = require("./payees/payeeController");
var billController = require("./bills/billController");

module.exports = function(app) {
	app.post("/payee", payeeController.savePayee);
	app.get("/payee", payeeController.getPayees);
	app.post("/bill", billController.saveBill);
	app.get("/bill/:payeeId", billController.getBills);
};
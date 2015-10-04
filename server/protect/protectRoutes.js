var protectController = require("./protectController");

module.exports = function(app) {
	app.post("/payee", protectController.savePayee);
	app.get("/payee", protectController.getPayees);
};
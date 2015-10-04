var authController = require("./authController");

module.exports = function(app) {
	app.post("/signin", authController.signin);
	app.post("/signup", authController.signup);
	app.get("/signedin", authController.checkAuth);
};
var morgan = require("morgan");
var bodyParser = require("body-parser");
var helpers = require("./helpers");

module.exports = function(app, express) {
	var authRouter = express.Router();
	var protectRouter = express.Router();

	app.use(morgan("dev"));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + "/../client"));

	
	app.use("/api/users", authRouter);

	app.use("/api/protect", helpers.decodeToken);
	app.use("/api/protect", protectRouter);

	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);

	require("./auth/authRoutes")(authRouter);
	require("./protect/protectRoutes")(protectRouter);
};
var morgan = require("morgan");
var bodyParser = require("body-parser");
var helpers = require("./helpers");

module.exports = function(app, express) {
	var publicRouter = express.Router();
	var privateRouter = express.Router();

	app.use(morgan("dev"));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + "/../client"));

	
	app.use("/api/users", publicRouter);

	app.use("/api/protect", helpers.decodeToken);
	app.use("/api/protect", privateRouter);

	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);

	require("./public/publicRoutes")(publicRouter);
	require("./private/privateRoutes")(privateRouter);
};
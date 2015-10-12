var express = require("express");
var mongoose = require("mongoose");

var app = express();

mongoose.connect("mongodb://localhost/plastiq", function(error) {
	if (error) {
		console.error(error);
	} else {
		console.log("Mongo Connected!!");
	}
});

require("./middleware")(app, express);


app.listen(process.env.PORT || 3030);
console.log("listening on port 3030");

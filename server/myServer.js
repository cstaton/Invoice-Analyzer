var express = require("express");
var mongoose = require("mongoose");

var app = express();

mongoose.connect("mongodb://localhost/plastiq")

require("./middleware")(app, express);


app.listen(process.env.PORT || 3030);
console.log("listening on port 3030")
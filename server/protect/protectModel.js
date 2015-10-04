var mongoose = require("mongoose");


var PayeeSchema = new mongoose.Schema({
	userId: mongoose.Schema.ObjectId,
	name: {
		type: String,
		required: true
	},
	address: String,
	payeeType: String,
	placeId: String
});



module.exports = mongoose.model("payees", PayeeSchema);
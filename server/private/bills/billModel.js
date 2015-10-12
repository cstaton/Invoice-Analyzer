var mongoose = require("mongoose");

var BillSchema = new mongoose.Schema({
	userId: mongoose.Schema.ObjectId,
	payeeId: mongoose.Schema.ObjectId,
	invoiceNum: String,
	dateDue: Date,
	amount: Number
});

module.exports = mongoose.model("bills", BillSchema);
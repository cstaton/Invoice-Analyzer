var mongoose = require("mongoose");

var PaymentSchema = new mongoose.Schema({
	vendorName: String,
	invoiceNum: String,
	payDate: Date
});

module.exports = mongoose.model("payments", PaymentSchema);
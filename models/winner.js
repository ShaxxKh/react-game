const mongoose = require("mongoose");

const winner = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	opponent: {
		type: String,
		required: true,
	},
	mode: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("winners", winner, "winners");

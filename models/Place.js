const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	location: { lat: { type: Number, required: true }, lng: { type: Number, required: true } },
	creator: {
		type: mongoose.Types.ObjectId, // Id of related model
		required: true,
		ref: "User",
	},
	rate: {
		rating: { type: Number, required: false, default: 0 },
		isRated: { type: Boolean, required: false, default: false },
	},
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;

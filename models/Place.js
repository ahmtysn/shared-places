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
		ref: "User", // with ref we can use populate method to get all the data from related schema (in this case User schema)
	},
	comments: [
		{
			date: { type: Date, required: true },
			userId: { type: String, required: true },
			comment: { type: String, required: true, minlength: 5 },
			placeId: { type: String, required: true },
			creator: { name: String, image: String },
		},
	],
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;

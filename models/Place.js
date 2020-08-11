const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({     //get all information
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
		ref: 'User', // with ref we can use populate method to get all the data from related schema (in this case User schema) //5
	},
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;

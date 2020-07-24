const Place = require("./../models/Place");
const HttpError = require("./../models/http-error");

const ratePlace = async (req, res, next) => {
	const placeId = req.params.pid;
	const { rating, isRated } = req.body;

	let place;
	try {
		place = await Place.findById(placeId);
	} catch (err) {}

	place.rate.rating = rating;
	place.rate.isRated = isRated;

	try {
		await place.save();
	} catch (err) {
		const error = new HttpError("Something went wrong, could not update place.", 500);

		return next(error);
	}

	res.status(200).json({ rate: place.rate });
};

exports.ratePlace = ratePlace;

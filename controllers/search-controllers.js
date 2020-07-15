const HttpError = require('./../models/http-error');
const User = require('./../models/User');
const Place = require('./../models/Place');

const searchUsersPlaces = async (req, res, next) => {
  let users;
  let places;
  try {
      users = await User.find({
      $or: [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
      ],
    });
    console.log(users)

    places = await Place.find({
      $or: [
        { title: { $regex: req.query.q, $options: 'i' } },
        { address: { $regex: req.query.q, $options: 'i' } },
      ],
    });
  } catch (err) {
    const error = new HttpError(
      'Fetching users, places failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({
    users: users.map((user) => user.toObject({ getters: true })),
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

exports.searchUsersPlaces = searchUsersPlaces;

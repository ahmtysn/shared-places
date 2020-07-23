const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const HttpError = require('./../models/http-error');
const User = require('./../models/User');

//social Media Signup
const socialMediaSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Make sure to pass in the correct data!', 422);
    return next(error);
  }
  const { name, email, password, image } = req.body;

  let emailExists;
  try {
    // Check if email "user" already exists
    emailExists = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not create user!',
      500,
    );
    return next(error);
  }
  if (emailExists) {
    const error = new HttpError(
      'user is already exists, please login instead!',
      422,
    );
    return next(error);
  }
  // Create new user
  const createdUser = new User({
    name,
    email,
    image,
    password,
    places: [],
  });

  try {
    // Save user
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500,
    );
    return next(error);
  }

  let token;
  try {
    // Create an authentication token
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, token please try again later.',
      500,
    );
    return next(error);
  }
  const modifiedUser = newUser.toObject({ getters: true });

  res
    .status(201)
    .json({ userId: modifiedUser.id, email: modifiedUser.email, token });
};

//social Media Login
const socialMediaLogin = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedUser;
  try {
    // Check if user exists
    identifiedUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, check your credentials and try again!',
      500,
    );
    return next(error);
  }

  if (!identifiedUser) {
    const error = new HttpError('Credentials are incorrect!', 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: identifiedUser.id, email: identifiedUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, check your credentials and try again!',
      500,
    );
    return next(error);
  }
  const modifiedUser = identifiedUser.toObject({ getters: true });
  res
    .status(200)
    .json({ userId: modifiedUser.id, email: modifiedUser.email, token });
};

exports.socialMediaSignup = socialMediaSignup;
exports.socialMediaLogin = socialMediaLogin;

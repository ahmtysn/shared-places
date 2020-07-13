const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const HttpError = require('./../models/http-error');
const User = require('./../models/User');

const hashPassword = require('./../util/hashPassword');
const comparePassword = require('./../util/comparePassword');

const getAllUsers = async (req, res, next) => {
  let users;

  try {
    // Find all users, return without password
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find users.',
      500
    );
    return next(error);
  }

  // Respond with users in JS format
  const modifiedUsers = users.map((user) => user.toObject({ getters: true }));
  res.status(200).json(modifiedUsers);
};

const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Make sure to pass in the correct data!', 422);
    return next(error);
  }
  const { name, email, password } = req.body;
  const { path } = req.file;

  let emailExists;
  try {
    // Check if email already exists
    emailExists = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not create user!',
      500
    );
    return next(error);
  }

  if (emailExists) {
    const error = new HttpError(
      'Email already exists, please login instead!',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    // Hash password
    hashedPassword = await hashPassword(password);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not create user!',
      500
    );
    return next(error);
  }

  if (!hashedPassword || hashedPassword === password) {
    const error = new HttpError(
      'Something went wrong, could not hash password!',
      500
    );
    return next(error);
  }

  // Create new user
  const newUser = new User({
    name,
    email,
    image: path,
    password: hashedPassword,
    places: [],
  });

  let token;
  try {
    // Save user
    await newUser.save();

    // Create an authentication token
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not create user!',
      500
    );
    return next(error);
  }

  const modifiedUser = newUser.toObject({ getters: true });

  res
    .status(201)
    .json({ userId: modifiedUser.id, email: modifiedUser.email, token });
};

const logUserIn = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedUser;
  let isPasswordCorrect;
  try {
    // Check if user exists
    identifiedUser = await User.findOne({ email });
    isPasswordCorrect = await comparePassword(
      password,
      identifiedUser.password
    );
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, check your credentials and try again!',
      500
    );
    return next(error);
  }

  if (!identifiedUser || !isPasswordCorrect) {
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
      }
    );
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, check your credentials and try again!',
      500
    );
    return next(error);
  }

  const modifiedUser = identifiedUser.toObject({ getters: true });
  res
    .status(200)
    .json({ userId: modifiedUser.id, email: modifiedUser.email, token });
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.logUserIn = logUserIn;

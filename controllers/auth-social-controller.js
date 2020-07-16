const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// const HttpError = require('./../models/http-error');
// const User = require('./../models/User');

const socialMediaSignup = (req, res, next) => {
  res.json({ meg: 'Hello' });
};
const socialMediaLogin = (req, res, next) => {
  res.json({ meg: 'world' });
};

exports.socialMediaSignup = socialMediaSignup;
exports.socialMediaLogin = socialMediaLogin;

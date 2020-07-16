const express = require('express');
const { check } = require('express-validator');

const authSocialRoutes = express.Router();

const authSocialController = require('../controllers/auth-social-controller.js');

authSocialRoutes.post(
  '/signup',
  [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail()],
  authSocialController.socialMediaSignup,
);
authSocialRoutes.post('/login', authSocialController.socialMediaLogin);

module.exports = authSocialRoutes;

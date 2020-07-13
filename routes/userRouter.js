const express = require('express');
const uploadFile = require('./../middlewares/uploadFile');

const userRouter = express.Router();

// Controllers
const { getAllUsers } = require('./../controllers/users-controllers');
const { createUser } = require('./../controllers/users-controllers');
const { logUserIn } = require('./../controllers/users-controllers');

// Validators
const validateSignup = require('./../middlewares/validation/validateSignup');

userRouter.route('/').get(getAllUsers);
userRouter
  .route('/signup')
  .get((req, res) => res.json({ msg: 'GET signup route found!' }))
  .post(uploadFile.single('image'), validateSignup, createUser);
userRouter.route('/login').post(logUserIn);

module.exports = userRouter;

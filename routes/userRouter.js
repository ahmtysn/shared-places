const express = require('express');
const uploadFile = require('./../middlewares/uploadFile');
const checkAuth = require('./../middlewares/checkAuth');
const userRouter = express.Router();

// Controllers
const { getAllUsers } = require('./../controllers/users-controllers');
const { createUser } = require('./../controllers/users-controllers');
const { logUserIn } = require('./../controllers/users-controllers');
const {
  getBucketList,
  addToBucketList,
  deleteFromBucketList,
} = require('./../controllers/bucketlist-controllers');

// Validators
const validateSignup = require('./../middlewares/validation/validateSignup');

userRouter.route('/').get(getAllUsers);
userRouter
  .route('/signup')
  .get((req, res) => res.json({ msg: 'GET signup route found!' }))
  .post(uploadFile.single('image'), validateSignup, createUser);
userRouter.route('/login').post(logUserIn);

//BucketList_Routes
userRouter.get('/bucketlist/:uid', getBucketList);
userRouter.use(checkAuth);
userRouter.route('/bucketlist/:pid').patch(addToBucketList);
userRouter.route('/bucketlist/:pid').delete(deleteFromBucketList);

module.exports = userRouter;

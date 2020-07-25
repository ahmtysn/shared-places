const express = require("express");

const userRouter = express.Router();

// Middleware
const uploadFile = require("./../middlewares/uploadFile");
const checkAuth = require("./../middlewares/checkAuth");

// Controllers
const { getAllUsers } = require("./../controllers/users-controllers");
const { createUser } = require("./../controllers/users-controllers");
const { logUserIn } = require("./../controllers/users-controllers");
const { getUserById } = require("./../controllers/users-controllers");
const { updateAccount } = require("./../controllers/users-controllers");
const { deleteAccount } = require("./../controllers/users-controllers");

// Validators
const validateSignup = require("./../middlewares/validation/validateSignup");
const validateUpdateAccount = require("./../middlewares/validation/validateUpdateAccount");

// Public routes
userRouter.route("/").get(getAllUsers);

userRouter
  .route("/signup")
  .get((req, res) => res.json({ msg: "GET signup route found!" }))
  .post(uploadFile.single("image"), validateSignup, createUser);
userRouter.route("/login").post(logUserIn);

// change account settings feature
//////////////////////////////////////
// Middleware checks for authentication
userRouter.use(checkAuth);

// Private routes
userRouter.route("/account/:userId").get(getUserById);
userRouter
  .route("/account/:userId")
  .patch(uploadFile.single("image"), validateUpdateAccount, updateAccount)
  .delete(deleteAccount);

module.exports = userRouter;

const express = require('express');

const placesRouter = express.Router();

// Middleware
const uploadFile = require('./../middlewares/uploadFile');
const checkAuth = require('./../middlewares/checkAuth');

// Controllers
const { getAllPlaces } = require('./../controllers/places-controllers');
const { getPlaceById } = require('./../controllers/places-controllers');
const { getPlacesByUserId } = require('./../controllers/places-controllers');
const { createPlace } = require('./../controllers/places-controllers');
const { updatePlace } = require('./../controllers/places-controllers');
const { deletePlace } = require('./../controllers/places-controllers');

// Validators
const validateCreatePlace = require('./../middlewares/validation/validateCreatePlace');
const validateUpdatePlace = require('./../middlewares/validation/validateUpdatePlace');

// Public routes
placesRouter.get('/', getAllPlaces);
placesRouter.get('/:placeId', getPlaceById);
placesRouter.route('/user/:userId').get(getPlacesByUserId);

// Middleware checks for authentication
placesRouter.use(checkAuth);

// Private routes
placesRouter
  .route('/')
  .post(uploadFile.single('image'), validateCreatePlace, createPlace);

placesRouter
  .route('/:placeId')
  .patch(validateUpdatePlace, updatePlace)
  .delete(deletePlace);

module.exports = placesRouter;

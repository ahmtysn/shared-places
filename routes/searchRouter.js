const express = require('express');

const searchRouter = express.Router();

// Controllers
const { searchUsersPlaces } = require('./../controllers/search-controllers');

// Public routes
searchRouter.get('/search', searchUsersPlaces);

module.exports = searchRouter;

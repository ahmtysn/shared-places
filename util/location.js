const axios = require('axios');
const HttpError = require('./../models/http-error');

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=pk.eyJ1IjoiaHlmY2xhc3MyNiIsImEiOiJja2QzNG5hMzQxanhnMnNwdnJ0ZmN1YzB0In0.9wpXECjySi4MS-oOpxwWYQ`
  );

  const data = response.data;

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address',
      422
    );
    throw error;
  }

  const coordinates = data.features[0].geometry.coordinates;

  return {
    lat: coordinates[1],
    lng: coordinates[0],
  };
}

module.exports = getCoordsForAddress;

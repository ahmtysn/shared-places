const path = require('path');
const express = require('express');
const app = express();
const connectDB = require('./util/connectDB');

const { errorHandler } = require('./middlewares/errorHandler');
const { errorNoRoute } = require('./middlewares/errorHandler');
const enableCORS = require('./middlewares/enableCORS');

// Routes
const placeRouter = require('./routes/placeRouter.js');
const userRouter = require('./routes/userRouter.js');

// Middlewares
app.use(express.json());
app.use(enableCORS); // Only necessary if API is separate from client

// Whenever request hits this path, return static files
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use(express.static('./frontend/build'));

// Routes
app.use('/api/places', placeRouter);
app.use('/api/users', userRouter);

// Any request that enters will be served the React app
app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
});

// General error handling if route doesn't exist
app.use(errorNoRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = () => {
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}!`);
  });
};

connectDB(server);

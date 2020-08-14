const mongoose = require('mongoose');

const DB_USER = process.env.DB_USER;
const DB_PW = process.env.DB_PW;
const DB_NAME = process.env.DB_NAME;
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PW}@cluster0-jtuqz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const DB_URL1 = `mongodb+srv://manu:5jltYkJttJkaxXBg@cluster0-c0hbd.mongodb.net/mern?retryWrites=true&w=majority`;
const connectDB = (server) => {
  mongoose
    .connect(DB_URL1, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })

    .then(() => server())
    .catch((err) => console.log('err happened in db connection!', err));
};
// the logic of connecting the backend to mongoose is like:
// 1- Establish the connecting to database
// 2- connection successful? then we start our backend server. (Not successful then we don't need server because we will throw an error )

module.exports = connectDB;

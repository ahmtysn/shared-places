const mongoose = require('mongoose');

const DB_USER = process.env.DB_USER;
const DB_PW = process.env.DB_PW;
const DB_NAME = process.env.DB_NAME;
//`mongodb+srv://${DB_USER}:${DB_PW}@cluster0-jtuqz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
const connectDB = (server) => {
  mongoose
    .connect(`mongodb+srv://manu:5jltYkJttJkaxXBg@cluster0-c0hbd.mongodb.net/mern?retryWrites=true&w=majority`
      ,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => server())
    .catch((err) => console.log('err happened in db connection!', err));
};

module.exports = connectDB;

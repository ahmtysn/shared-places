const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  friends: [{ type: Object, required: true }],
  requestslist: [{ type: Object, required: true }],
  image: { type: String, required: true },
  places: [
    {
      type: mongoose.Types.ObjectId, // Id of related model
      required: true,
      ref: "Place",
    },
  ],
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;

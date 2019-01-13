const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TweetSchema object
const UserSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  pw: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using Mongoose's model method
const User = mongoose.model("User", UserSchema);

// Export the Tweet model
module.exports = User;

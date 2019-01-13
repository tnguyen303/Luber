const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TweetSchema object
const TripSchema = new Schema({
  time: {
    type: Number,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  fare: {
    type: Number,
    required: true
  },
  driver: {
    type: String,
    required: true,
    default: "driver1"
  }
});

// This creates our model from the above schema, using Mongoose's model method
const Trip = mongoose.model("Trip", TripSchema);

// Export the Tweet model
module.exports = Trip;

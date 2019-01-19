const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;

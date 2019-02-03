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
  vehicleType:{
    type: String,
    required: true
  },
  driverUid: {
    type: Number,
    required: true
  },
  driverName: {
    type: String,
    required: true
  },
  riderUid:{
    type: Number,
    required: true
  }
});

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;

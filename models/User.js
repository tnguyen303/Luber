const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  uid: {
    type: Number,
    required: true,
    unique: true,
    min: 1000000000,
    max: 9999999999
  },
  pw: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true,
    default: "std"
  },
  avatar: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  billing: {
    cardNumber: {
      type: Number,
      required: true
    },
    expMonth: {
      type: Number,
      required: true
    },
    expYear: {
      type: Number,
      required: true
    },
    CVV: {
      type: Number,
      required: true
    },
    nameOnCard: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: Number,
      required: true
    }
  },
  tripList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Trip"
    }
  ],
  currentLoc: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    streetAddress: {
      type: String
    }
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

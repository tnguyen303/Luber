require("dotenv").config();

const User = require("../models/User");
const Trip = require("../models/Trip");

const axios = require("axios");

//returns an encoded URL to access Google Distance Matrix API
const composeURL = function(originStr, destinationStr) {
  return (
    "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" +
    originStr +
    "&destinations=" +
    destinationStr +
    `&key=${process.env.GAPI_KEY}`
  );
};

module.exports = function(app) {
  //create a new login
  app.post("/api/signup", function(req, res) {
    User.create(req.body)
      .then(function(data) {
        res.json({ success: true });
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //login verification
  app.post("/api/login", function(req, res) {
    User.findOne({ uid: req.body.uid }).then(function(data) {
      if (data === null) {
        res.json({ success: false });
      }
      if (data.pw !== req.body.pw) {
        res.json({ success: false });
      }
      if (data.pw === req.body.pw) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    });
  });

  //get distance and duration from Google API
  app.get("/api/trip/:originStr/:destinationStr", function(req, res) {
    axios
      .get(composeURL(req.params.originStr, req.params.destinationStr))
      .then(result => res.json(result.data));
  });

  //get fare list using distance input in miles
  app.get("/api/fare/:distance", function(req, res) {
    const fareList = [
      {
        type: "std",
        description: "Luber Standard (4 persons)",
        price: (req.params.distance * process.env.STDRATE).toFixed(2)
      },
      {
        type: "lux",
        description: "Luber Luxury (4 persons)",
        price: (req.params.distance * process.env.LUXRATE).toFixed(2)
      },
      {
        type: "lg",
        description: "Luber Van (6 persons)",
        price: (req.params.distance * process.env.LGRATE).toFixed(2)
      }
    ];

    res.json(fareList);
  });

  //return n most close-by drivers, takes in the current location object
  app.post("/api/drivers", function(req, res) {
    const qty = 20;
    const destinationStr = req.body.destinationStr;
    const driverLocList = [];
    let originStr = "";

    User.find({ role: "driver" })
      .then(function(data) {
        data.forEach(e => {
          driverLocList.push({
            id: e.uid,
            lat: e.currentLoc.latitude,
            lng: e.currentLoc.longitude,
            vehicleType: e.vehicleType
          });

          originStr += `${e.currentLoc.latitude},${e.currentLoc.longitude}|`;
        });

        originStr = originStr.substring(0, originStr.length - 1);

        axios
          .get(composeURL(originStr, destinationStr))
          .then(result => {
            for (let i = 0; i < driverLocList.length; i++) {
              driverLocList[i].duration =
                result.data.rows[i].elements[0].duration.value;
              driverLocList[i].distance =
                result.data.rows[i].elements[0].distance.value;
              driverLocList[i].address = result.data.origin_addresses[i];
            }

            driverLocList.sort((a, b) => {
              return a.duration - b.duration;
            });
            res.json(driverLocList.slice(0, qty));
          })
          .catch(err => console.log(err));
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //return account data, SENSITIVE INFO!
  app.post("/api/account", function(req, res) {
    User.findOne({ uid: req.body.uid }).then(function(data) {
      res.json(data);
    });
  });
};

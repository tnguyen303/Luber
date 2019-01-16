require("dotenv").config();

const User = require("../models/User");
const Trip = require("../models/Trip");

const axios = require("axios");

const roundUp = function(num, precision) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
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
    const encodedLink =
      "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" +
      req.params.originStr +
      "&destinations=" +
      req.params.destinationStr +
      `&key=${process.env.GAPI_KEY}`;

    axios.get(encodedLink).then(function(result) {
      res.json(result.data);
    });
  });

  //get fare list using distance input in miles
  app.get("/api/fare/:distance", function(req, res) {
    const fareList = [
      {
        type: "stdFare",
        description: "Luber Standard (4 persons)",
        price: roundUp(req.params.distance * 1, 2)
      },
      {
        type: "luxFare",
        description: "Luber Luxury (4 persons)",
        price: roundUp(req.params.distance * 1.4, 2)
      },
      {
        type: "lgFare",
        description: "Luber Van (6 persons)",
        price: roundUp(req.params.distance * 1.25, 2)
      }
    ];

    res.json(fareList);
  });

  app.get("/api/todo", function(req, res) {
    Todo.find({})
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.post("/api/todo", function(req, res) {
    Todo.create(req.body)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.delete("/api/todo", function(req, res) {
    Todo.deleteOne(req.body)
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};

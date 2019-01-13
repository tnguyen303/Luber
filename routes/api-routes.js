const User = require("../models/User");
const Trip = require("../models/Trip");

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

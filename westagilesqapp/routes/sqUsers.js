const express = require("express");
const router = express.Router();
const usersModel = require("../models").Users;
router.get("/", function (req, res) {
  usersModel.findAll().then(
    function (user) {
      res.status(200).json(user);
    },
    function (error) {
      res.status(500).send(error);
    }
  );
});
router.post("/create", function (req, res) {
  console.log(req.body);
  let { username, password, date_of_creation } = req.body;
  usersModel
    .findOne({
      where: { username: username },
    })
    .then((user) => {
      if (user === null) {
        usersModel
          .create({
            username: username,
            password: password,
            date_of_creation: date_of_creation,
          })
          .then(function (user) {
            res.json({ status: 1, data: "user created" });
          });
      } else {
        res.json({ status: 0, debug_data: "username already exists" });
      }
    });
});
router.put("/:username", function (req, res) {
  console.log(req.body);
  let { username, password, date_of_creation } = req.body;
  usersModel
    .update(
      {
        username: username,
        password: password,
        date_of_creation: date_of_creation,
      },
      {
        where: { username: req.params.username },
      }
    )
    .then(function (user) {
      res.status(200).json(user);
    });
});
router.get("/delete/:username", function (req, res) {
  console.log(req.body);
  usersModel
    .destroy({
      where: { username: req.params.username },
    })
    .then(function (user) {
      res.status(200).json(user);
    });
});
router.post("/checklogin", function (req, res) {
  console.log(req.body);
  usersModel
    .findOne({
      where: { username: req.body.username, password: req.body.password },
    })
    .then(function (user) {
      if (user === null) {
        req.session["isLoggedIn"] = 0;
        res.json({ status: 0, data: "incorrect login details" });
      } else {
        req.session["username"] = req.body.username;
        req.session["isLoggedIn"] = 1;
        res.json({ status: 1, data: req.body.username });
      }
    });
});
router.get("/showdetails", (req, res) => {
  if (req.session.isLoggedIn === 1) {
    usersModel
      .findOne({
        where: { username: req.session.username },
      })
      .then(
        function (user) {
          res.status(200).json(user);
        },
        function (error) {
          res.status(500).send(error);
        }
      );
  } else {
    res.json({ status: 0, debug_data: "you are not logged in" });
  }
});
module.exports = router;

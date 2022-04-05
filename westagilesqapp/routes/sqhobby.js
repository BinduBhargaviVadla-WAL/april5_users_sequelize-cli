const express = require("express");
const router = express.Router();
const hobbyModel = require("../models").Hobby;
router.get("/", function (req, res) {
  hobbyModel.findAll().then(
    function (hobby) {
      res.status(200).json(hobby);
    },
    function (error) {
      res.status(500).send(error);
    }
  );
});
router.get("/hobbies/create", function (req, res) {
  hobbyModel
    .create({ name: "hobby1", description: "Description 1" })
    .then(function (hobby) {
      res.status(200).json(hobby);
    });
});
module.exports = router;

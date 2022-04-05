const express = require("express");
const router = express.Router();
const productModel = require("../mysqlmodels/product");
router.get("/", function (req, res) {
  productModel.findAll().then(
    function (products) {
      res.status(200).json(products);
    },
    function (error) {
      res.status(500).send(error);
    }
  );
});
router.get("/create/:title/:price", function (req, res) {
  productModel
    .create({ title: req.params.title, price: req.params.price })
    .then(function (product) {
      res.status(200).json(product);
    });
});
module.exports = router;

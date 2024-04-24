const Product = require("../model/product");
const mongoose = require("mongoose");

exports.getProducts = (req, res, next) => {
  Product.find()
    .exec()
    .then((result) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "No entry found ",
          error_code: 404,
          data: "",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed: " + error,
        error_code: 500,
        data: "",
      });
    });
};

exports.createProduct = (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then(() => {
      res.status(200).json({
        message: "Success",
        error_code: 0,
        data: product,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error: " + error,
        error_code: 500,
        data: "",
      });
    });
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "No valid entry found for provider ID",
          error_code: 404,
          data: "",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error: " + error,
        error_code: 500,
        data: "",
      });
    });
};

exports.updateProduct = (req, res, next) => {
  const productId = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.findOneAndUpdate({ _id: productId }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error: " + error,
        error_code: 500,
        data: "",
      });
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByIdAndDelete({ _id: productId })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error: " + error,
        error_code: 500,
        data: "",
      });
    });
};

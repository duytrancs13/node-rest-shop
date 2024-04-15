const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) =>
  res.status(200).json({
    message: "Handler GET request to /products",
  })
);

router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  res.status(200).json({
    message: "Order was created",
    createdOrder: order,
  });
});

router.get("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  if (orderId === "special") {
    res.status(200).json({
      message: "special",
    });
  } else {
    res.status(200).json({
      message: "You passed ID",
    });
  }
});

router.patch("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  res.status(200).json({
    message: "Updated order",
    orderId,
  });
});

router.delete("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  res.status(200).json({
    message: "Deleted order",
    orderId,
  });
});

module.exports = router;

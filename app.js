const express = require("express");
const app = express();
// const { config } = require("dotenv");
// const bodyParser = require("body-parser");

const productsRoute = require("./api/routes/products.js");
const ordersRoute = require("./api/routes/orders.js");
const userRoute = require("./api/routes/user.js");
const courseRoute = require("./api/routes/course.js");
const cartRoute = require("./api/routes/cart.js");
const paymentRoute = require("./api/routes/payment.js");

const dbConnect = require("./db-connect.js");

// config();
dbConnect();

// body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// version express <4.16 install bodyParser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }

  // Pass to next layer of middleware
  next();
});

app.use("/products", productsRoute);
app.use("/orders", ordersRoute);
app.use("/api/course", courseRoute);
app.use("/api/cart", cartRoute);
app.use("/api/request-payment", paymentRoute);
app.use("/api", userRoute);

// CORS
// app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:3000", "phonglam.surge.sh"] }));
// app.use(cors())

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: `${error.message}`,
    },
  });
});

module.exports = app;

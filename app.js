const express = require("express");
const app = express();

const customEnv = require("custom-env");
customEnv.env();
// const bodyParser = require("body-parser");

const userRoute = require("./api/routes/user.js");
const courseRoute = require("./api/routes/course.js");
const cartRoute = require("./api/routes/cart.js");
const requestPaymentRoute = require("./api/routes/request-payment.js");
const resultPaymentRoute = require("./api/routes/result-payment.js");
const myCourseRoute = require("./api/routes/my-course.js");
const curriculumRoute = require("./api/routes/curriculum.js");
const videoRoute = require("./api/routes/video.js");

const dbConnect = require("./db.js");

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

app.use("/api/course", courseRoute);
app.use("/api/cart", cartRoute);
app.use("/api/request-payment", requestPaymentRoute);
app.use("/api/result-payment", resultPaymentRoute);
app.use("/api/my-course", myCourseRoute);
app.use("/api/curriculum", curriculumRoute);
app.use("/api/video", videoRoute);
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

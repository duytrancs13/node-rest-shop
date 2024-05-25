const express = require("express");
const app = express();
// const { config } = require("dotenv");
// const bodyParser = require("body-parser");

const multer = require("multer");
const firebase = require("firebase");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const productsRoute = require("./api/routes/products.js");
const ordersRoute = require("./api/routes/orders.js");
const userRoute = require("./api/routes/user.js");
const courseRoute = require("./api/routes/course.js");
const cartRoute = require("./api/routes/cart.js");
const paymentRoute = require("./api/routes/payment.js");
const paymentMomoRoute = require("./api/routes/payment-momo.js");
const myCourseRoute = require("./api/routes/my-course.js");
const curriculumRoute = require("./api/routes/curriculum.js");

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

const firebaseConfig = {
  apiKey: "AIzaSyCoITtjdObw5-XoRrvxY_jNhLRQzy6kLz4",
  authDomain: "videostore-fc49a.firebaseapp.com",
  projectId: "videostore-fc49a",
  storageBucket: "videostore-fc49a.appspot.com",
  messagingSenderId: "863212569078",
  appId: "1:863212569078:web:96a541091f68f0c2be87d7",
  measurementId: "G-54B0FN4L8X",
};
firebase.initializeApp(firebaseConfig);

const storage = getStorage();
const upload = multer({
  storage: multer.memoryStorage(),
});

app.use("/products", productsRoute);
app.use("/orders", ordersRoute);
app.use("/api/course", courseRoute);
app.use("/api/cart", cartRoute);
app.use("/api/request-payment-momo", paymentMomoRoute);
app.use("/api/request-payment", paymentRoute);
app.use("/api/my-course", myCourseRoute);
app.use("/api/curriculum", curriculumRoute);
app.use("/api", userRoute);

app.post("/upload", upload.single("video"), (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded");
    return;
  }
});

const StorageRef = ref(storage, req.file.originalname);
const metadata = {
  contentType: "video/mp4",
};
uploadBytes(StorageRef, req.file.buffer, metadata).then(() => {
  getDownloadURL(StorageRef)
    .then((url) => {
      res.send({ url });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

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

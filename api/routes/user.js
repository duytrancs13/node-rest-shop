const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../model/user");

router.post("/sign-up", (req, res, next) => {
  
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          error_code: 409,
          message: "Email is existed, please use other email",
          data: "",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          // Store hash in your password DB.
          if (err) {
            return res.status(500).json({
              error_code: 500,
              message: err,
              data: "",
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            
            user
              .save()
              .then(() => {
                return res.status(200).json({
                  error_code: 0,
                  message: "Successful",
                  data: "",
                });
              })
              .catch((error) => {
                res.status(500).json({
                  error_code: 500,
                  message: error,
                  data: "",
                });
              });
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error_code: 500,
        message: error,
        data: "",
      });
    });
});

router.post("/sign-in", (req, res, next) => {
  const body = { email: "test2@gmail.com", password: "test123" };
  User.find({ email: body.email })
    .exec()
    .then((user) => {
      if (!user.length) {
        return res.status(401).json({
          message: "Auth failed 0",
        });
      }
      bcrypt.compare(body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed 1",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth success",
            token,
          });
        }
        return res.status(401).json({
          message: "Auth failed 2",
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.delete("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  User.findByIdAndDelete({ _id: userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

module.exports = router;

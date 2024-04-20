const express = require("express");
const mongoose = require("mongoose");

// lib
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { STATUS, MESSAGE } = require("../constant");
const User = require("../model/user");

const router = express.Router();

router.post("/sign-up", (request, response, next) => {
  User.find({ email: request.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return response.status(STATUS.SUCCESS).json({
          error_code: MESSAGE.EXIST_EMAIL.code,
          message: MESSAGE.EXIST_EMAIL.message,
          data: "",
        });
      } else {
        bcrypt.hash(request.body.password, 10, (error, hash) => {
          // Store hash in your password DB.
          if (error) {
            return response.status(STATUS.ERROR).json({
              error_code: MESSAGE.SERVER.code,
              message: MESSAGE.SERVER.message,
              data: "",
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: request.body.email,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                return response.status(STATUS.SUCCESS).json({
                  error_code: MESSAGE.SUCCESS.code,
                  message: MESSAGE.SUCCESS.message,
                  data: "",
                });
              })
              .catch((error) => {
                response.status(STATUS.ERROR).json({
                  error_code: MESSAGE.SERVER.code,
                  message: MESSAGE.SERVER.message,
                  data: "",
                });
              });
          }
        });
      }
    })
    .catch((error) => {
      response.status(STATUS.ERROR).json({
        error_code: MESSAGE.SERVER.code,
        message: MESSAGE.SERVER.message,
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
          return res.status(200).json({
            error_code: 103,
            message: "Password không đúng",
            data: "",
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
            message: "S",
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

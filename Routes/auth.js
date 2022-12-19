const express = require("express");

const router = express.Router();

const db = require("../db");

const User = db.get("users");

const Schema = require("../models/Auth");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const fetchuser = require("../middlewares/fetchuser");

// Route 1 : Create user using POST : "/api/v1/auth/createUser"
router.post("/createUser", async (req, res) => {
  try {
    // validate the body
    const user = await Schema.validateAsync(req.body);
    if (user) {
      // check if email already exist
      const isExist = await User.findOne({ email: req.body.email });
      if (isExist) {
        return res.status(422).json({
          message: "User already registered",
        });
      }
      //   hash th password
      //   insert to DB
      const secPass = await bcrypt.hash(req.body.password, 10);
      user.password = secPass;
      user.created_on = new Date().toLocaleString();
      const created = await User.insert(user);

      //   sign jwt
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);

      return res.status(201).json({
        message: "User Signed Success",
        data: created,
        token: authToken,
      });
    }
    return res.status(422).json({
      message: "Try to register with valid credentials",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Route 2 : User login using POST "/api/v1/auth/userLogin"
router.post("/userLogin", async (req, res) => {
  try {
    // find the user
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // compare the password
      const isValidKey = await bcrypt.compare(req.body.password, user.password);
      if (!isValidKey) {
        return res.status(422).json({
          message: "Try to login with valid credentials",
        });
      }

      //   sign jwt
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);

      return res.status(201).json({
        message: "User Logged In Success",
        token: authToken,
      });
    }
    return res.status(404).json({
      message: "Try to login with valid credentials invalid email",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Route 3 : fetchuser using GET "/api/v1/auth/userProfile"
router.get("/getUser", fetchuser, async (req, res) => {
  try {
    const value = await User.findOne({
      _id: req.user._id,
    });
    res.json(value);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;

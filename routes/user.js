var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.route("/login").post(async (req, res) => {
  console.log(req.body);
  var user = await User.findOne({ email: req.body.username });
  if (!user) {
    user = await User.findOne({ username: req.body.username });
  }
  if (!user) {
    res.json({ message: "User not found" });
  } else {
    var permission = await bcrypt.compare(req.body.password, user.password);
    if (!permission) {
      res.json({ message: "Wrong password" });
    } else {
      const userr = {
        name: user.name,
        email: user.email,
        state: user.state,
        level: user.level,
        valid: Date.now(),
      };
      const token = jwt.sign(userr, process.env.JWT_secret_token);

      res.json({ token: token });
    }
  }
});

router.route("/register").post(async (req, res) => {
  var user = req.body;
  user.password = await User.hashPassword(user.password);
  const newuser = new User(user);
  console.log(newuser);
  await newuser.save();
  res.json(newuser);
});

module.exports = router;

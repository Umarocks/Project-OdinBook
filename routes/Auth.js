const express = require("express");
const router = express.Router();
const User = require("../Schema/user");
const passport = require("passport");
const { hashPassword } = require('../utils/helper');

router.post("/register",async (req, res) => {
  const { username, password, email, firstName, lastName, membershipStatus } =
    req.body;
  const newUser = new User({
    username: username,
    password: hashPassword(password),
    email: email,
    firstName: firstName,
    lastName: lastName,
    membershipStatus: membershipStatus,
  });
  const userExist = await User.findOne({
    $or: [{ username: username }, { email: email }],
    });
  if (!userExist) {
    await newUser.save();
    console.log("newUser");
    
  } else {
    console.log("userExist");
    console.log(userExist);
  }
  res.send("register post");
});


router.get("/login", passport.authenticate('local'), async (req, res) => {  
  
  if (!userExist) {
    res.write("User not found");
    console.log("User Not Found");
  } else {
    res.write("User found");
    console.log("Login Successful");
  }
  res.send();
});


module.exports = router;

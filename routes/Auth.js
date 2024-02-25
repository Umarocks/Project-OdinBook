const express = require("express");
const router = express.Router();
const User = require("../Schema/user");
const passport = require("passport");
const { hashPassword } = require("../utils/helper");

router.post("/register", async (req, res) => {
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

router.get(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  async (req, res) => {
    console.log(req.user.id);
    res.redirect("/auth/");
  }
);

router.get("/", (req, res) => {
  if (req.user) {
    res.write(req.user);
  } else {
    res.write("HOME PAGE");
  }
  res.send();
});
module.exports = router;

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/");
  });
});

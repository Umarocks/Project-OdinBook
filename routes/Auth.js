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

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/auth/home",
    failureMessage: true,
  }),
  async (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/auth/home");
    }
  }
);
router.get("/home", (req, res, next) => {
  res.render("Loggedin");
});

router.get("/login", async (req, res) => {
  res.render("loginPage");
});

router.get("/logout", (req, res, next) => {
  res.clearCookie("connect.sid");
  req.logout(function (err) {
    console.log(err);
    req.session.destroy(function (err) {
      res.redirect("/auth/login");
    });
  });
});

module.exports = router;

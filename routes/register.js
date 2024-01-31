const express = require("express");
const router = express.Router();
const User = require("../Schema/user");

router.post("/", async (req, res) => {
  const { username, password, email, firstName, lastName, membershipStatus } =
    req.body;

  const newUser = new User({
    username: username,
    password: password,
    email: email,
    firstName: firstName,
    lastName: lastName,
    membershipStatus: membershipStatus,
  });
  const userExist = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  console.log(userExist);
  if (!userExist) {
    await newUser.save();
    console.log("newUser");
  } else {
    console.log("userExist");
  }
  //   await User.deleteMany({ membershipStatus: "active" });
  //   const all = await User.find({ membershipStatus: "active" });
  //   console.log(all);
  res.send("register post");
});
module.exports = router;

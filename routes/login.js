const express = require("express");
const router = express.Router();
const User = require("../Schema/user");

router.get("/", async (req, res) => {
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
    $and: [{ username: username }, { password: password }],
  });
  console.log(userExist);
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

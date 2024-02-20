const passport = require('passport')
const {Strategy} = require('passport-local')
const User = require("../Schema/user");
const passwordUtil = require('../utils/helper')

passport.use(new Strategy({
    usernameField: 'username',
    passportField: 'password',
}, async (username,password,done) => {
    console.log(username)
    console.log(password)
    if (!username || !password) {
        done(new Error ('Please enter username and password , Missing Credential'),null)
    }
    const userExist = await User.findOne({
    $or: [{ username: username }, { password: passwordUtil.hashPassword(password) }],
    });
    if (!userExist) { throw new Error("Incorrect Credentials") }
    if (userExist) {
        const isValid = passwordUtil.comparePassword(password, userExist.password);
        if (!isValid) {
            console.log("Invalid password")
            done(null,null)
        }
        else {
            console.log("Valid password")
            done(null,userExist)
        }
    }
    console.log(userExist)

}))
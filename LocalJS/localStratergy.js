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
        return done(new Error('Please enter username and password, Missing Credential'), null);
    }

    try {
        const userExist = await User.findOne({ username: username });
        
        if (!userExist) {
            return done(null, false, { message: 'Incorrect username' });
        }

        const isValid = passwordUtil.comparePassword(password, userExist.password);
        console.log(isValid)
        if (!isValid) {
            return done(null, false, { message: 'Incorrect password' });
        }
        if (isValid) {
            console.log("Valid password")
            return done(null, userExist);
        }
    } catch (error) {
        return done(error);
    }

}))
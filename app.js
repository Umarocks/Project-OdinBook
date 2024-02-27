const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const hbs = require("hbs");
require("./LocalJS/localStratergy.js");

//Router
const auth = require("./routes/Auth.js");
const app = express();

mongoose.connect("mongodb://localhost:27017/mydb");

// view engine setup

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(
  session({
    secret: "umarbolte", // Replace with a secure key
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", auth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//Birds

app.listen(3000, () => {
  console.log("Express server listening on port 3000!");
});

module.exports = app;

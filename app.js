const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const { error } = require("console");

const app = express();

// filtering by properties that aren't in the schema
mongoose.set("strictQuery", false);
// database url to connect to
const mongeDBConnectionString =
  "mongodb+srv://essoh:messagesPas@messagescluster.hi7dd2x.mongodb.net/?retryWrites=true&w=majority";
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//connection to mongoDB
mongoose
  .connect(mongeDBConnectionString)
  .then((result) => {
    console.log("successful connection to the database");
  })
  .catch((error) => console.log(error));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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

module.exports = app;

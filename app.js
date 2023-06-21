const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
//import compression for http req and res compression on production
const compression = require("compression");
/*import helmet to help setting appropriate http headers on production
  this is for small traffic websites I will use NGINX for larger 
  traffic websites */
const helmet = require("helmet");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");

const app = express();

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

// filtering by properties that aren't in the schema
mongoose.set("strictQuery", false);
// database uri to connect to
const dev_db_uri =
  "mongodb+srv://essoh:messagesPas@messagescluster.hi7dd2x.mongodb.net/?retryWrites=true&w=majority";

const mongeDBConnectionString = process.env.MONGODB_URI || dev_db_uri;
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

// Apply rate limiter to all requests
app.use(limiter);

// set custom potions for CSP header  headers that help protect app from well-known vulnerablities
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"], // enable boostrap requirements
    },
  })
);

// routes and middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(compression()); // compress all routes

app.use(express.static(path.join(__dirname, "public"))); // set static folder path

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

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

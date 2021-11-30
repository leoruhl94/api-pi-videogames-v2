require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
// const cookieParser = require('cookie-parser');
const routes = require("./routes/index");
const cors = require("cors");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require("./middlewares/errorHandler");

const app = express();

app.name = "API";

const whitelist = [
  "http://localhost:3000",
  "https://the-games.herokuapp.com",
  "http://the-games.herokuapp.com",
  "http://192.168.0.114:3000",
  "http://the-games-app.tk",
  "https://the-games-app.tk",
  "https://www.the-games-app.tk",
  "http://www.the-games-app.tk"
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};

app.use(cors(options));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
// app.use(cookieParser());

app.use("/api", routes);
// // Error handler*/
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;

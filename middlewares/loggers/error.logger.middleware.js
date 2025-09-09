const winston = require("winston");
const expressWinston = require("express-winston");

const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: "log/error.log", level: "info" })],
  format: winston.format.combine(
    winston.format.json()
  ),
});

module.exports = errorLogger;

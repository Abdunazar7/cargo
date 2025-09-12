const winston = require('winston');
const { createLogger, format, transports, log } = require("winston");
const { combine, timestamp, label, prettyPrint, printf, json, colorize } =
  format;

require("winston-mongodb");

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: "Express cargo" }),
    timestamp(),
    myFormat,
    json()
  ),
  transports: [
    new transports.Console({ level: "debug" }),
    new transports.File({ filename: "log/error.log", level: "error" }),
    new transports.File({ filename: "log/combine.log", level: "info" }),
  ],
});

logger.exitOnError = false;

logger.exceptions.handle(
  new transports.File({ filename: "log/exceptions.log" })
);

logger.rejections.handle(
  new transports.File({ filename: "log/rejections.log" })
);

module.exports = logger;

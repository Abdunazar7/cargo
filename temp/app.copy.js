const express = require("express"); // HTTP server yaratish
const config = require("config"); 
const sequelize = require("./config/db"); // SQL ORm
const mainRouter = require("./routes/index.routes");
const cookieParser = require("cookie-parser"); // parse
const errorHandling = require("./middlewares/errors/error-handling");
const logger = require("./services/logger.service");
const requestLogger = require("./middlewares/loggers/request.logger.middleware");
const errorLogger = require("./middlewares/loggers/error.logger.middleware");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

// console.log(process.env.NODE_ENV);
// console.log(process.env.secret);
// console.log(config.get.secret);

const PORT = config.get("port") ?? 3333;

// process.on('unHandledRejection', (reject)=>{
//   console.log("unHandledRejection: ", reject);
// })

// process.on('uncaughtException', (exception)=>{
//   console.log("uncaughtException: ", exception.message);
//   // process.exit(1)
// })

// console.table("Table ma'lumotlari")
// console.trace("Trace ma'lumotlari")

// logger.log("info", "LOG ma'lumotlari");
// logger.error("Error ma'lumotlari");
// logger.debug("Debug ma'lumotlari");
// logger.info("Info ma'lumotlari");
// logger.warn("Warn ma'lumotlari");

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/logs";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);

app.use("/api", mainRouter);

app.use(errorLogger);

app.use(errorHandling); // eng oxiriga yoz

const start = async () => {
  try {
    const client = new MongoClient(url);
    await client.connect();
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`\nServer started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

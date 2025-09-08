const express = require("express");
const config = require("config");
const sequelize = require("./config/db");
const mainRouter = require("./routes/index.routes");
const cookieParser = require('cookie-parser');
const errorHandling = require("./middlewares/errors/error-handling");

require("dotenv").config({path:`.env.${process.env.NODE_ENV}`})

console.log(process.env.NODE_ENV);
console.log(process.env.secret);
console.log(config.get.secret);


const PORT = config.get("port") ?? 3333;

// process.on('unHandledRejection', (reject)=>{
//   console.log("unHandledRejection: ", reject);
// })

// process.on('uncaughtException', (exception)=>{
//   console.log("uncaughtException: ", exception.message);
//   // process.exit(1)
// })


const app = express();
app.use(cookieParser())
app.use(express.json());
app.use("/api", mainRouter);

app.use(errorHandling);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

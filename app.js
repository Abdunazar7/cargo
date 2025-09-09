const express = require("express");
const config = require("config");
const sequelize = require("./config/db");
const mainRouter = require("./routes/index.routes");
const viewRouter = require("./routes/view.routes");
const cookieParser = require("cookie-parser");
const errorHandling = require("./middlewares/errors/error-handling");
const exHbs = require('express-handlebars');

const PORT = config.get("port") ?? 3333;

const app = express();

app.use(express.json());
app.use(cookieParser());

const hbs = exHbs.create({
  defaultLayout: "main",
  extname: "hbs"
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

//serve static
app.use(express.static("views")) // read

app.use("/", viewRouter);
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

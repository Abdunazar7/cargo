const clientRouter = require("./client.routes");
const statusRouter = require("./status.routes");
const currencyRouter = require("./currency_type.routes");
const adminRouter = require("./admin.routes");
const orderRouter = require("./order.routes");
const operationRouter = require("./operation.routes");
const reportRouter = require("./report.routes");

const router = require("express").Router();

router.use("/clients", clientRouter);
router.use("/status", statusRouter);
router.use("/currency", currencyRouter);
router.use("/admins", adminRouter);
router.use("/orders", orderRouter);
router.use("/operations", operationRouter);
router.use("/reports", reportRouter);

module.exports = router;




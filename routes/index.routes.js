const clientRouter = require("./client.routes");
const statusRouter = require("./status.routes");
const currencyRouter = require("./currency_type.routes");
const adminRouter = require("./admin.routes");

const router = require("express").Router();

router.use("/clients", clientRouter);
router.use("/status", statusRouter);
router.use("/currency", currencyRouter);
router.use("/admins", adminRouter);

module.exports = router;

const { getClientsByOrderDate, getClientsWithMoreThan10OrdersA, getDeliveredOperationsBetweenDates, getTop5ClientsByOrders, getClientsWithOrdersInTransit } = require("../controllers/report.controller");
const router = require("express").Router();

router.post("/by-date", getClientsByOrderDate);
router.get("/more-orders", getClientsWithMoreThan10OrdersA);
router.post("/delivered-operations", getDeliveredOperationsBetweenDates);
router.get("/top5-clients", getTop5ClientsByOrders);
router.get("/clients-in-transit", getClientsWithOrdersInTransit);

module.exports = router;

const {
  addOrder,
  getOrders,
  getOneOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

const router = require("express").Router();

router.post("/", addOrder);
router.get("/", getOrders);
router.get("/:id", getOneOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;

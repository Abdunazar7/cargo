const {
  addOrder,
  getOrders,
  getOneOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");
const authGuard = require("../middlewares/guards/auth.guard");

const router = require("express").Router();

router.post("/", addOrder);
router.get("/", authGuard, getOrders);
router.get("/:id", getOneOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;

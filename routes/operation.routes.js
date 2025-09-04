const {
  addOperation,
  getOperations,
  getOneOperation,
  updateOperation,
  deleteOperation,
} = require("../controllers/operation.controller");
const authGuard = require("../middlewares/guards/auth.guard");

const router = require("express").Router();

router.post("/", addOperation);
router.get("/", authGuard, getOperations);
router.get("/:id", getOneOperation);
router.put("/:id", updateOperation);
router.delete("/:id", deleteOperation);

module.exports = router;

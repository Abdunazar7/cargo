const {
  addOperation,
  getOperations,
  getOneOperation,
  updateOperation,
  deleteOperation,
} = require("../controllers/operation.controller");

const router = require("express").Router();

router.post("/", addOperation);
router.get("/", getOperations);
router.get("/:id", getOneOperation);
router.put("/:id", updateOperation);
router.delete("/:id", deleteOperation);

module.exports = router;

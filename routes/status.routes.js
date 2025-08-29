const {
  addStatus,
  getStatuses,
  getOneStatus,
  updateStatus,
  deleteStatus,
} = require("../controllers/status.controller");
const router = require("express").Router();

router.post("/", addStatus);
router.get("/", getStatuses);
router.get("/:id", getOneStatus);
router.put("/:id", updateStatus);
router.delete("/:id", deleteStatus);

module.exports = router;

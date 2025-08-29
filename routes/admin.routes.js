const {
  addAdmin,
  getAdmins,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");
const router = require("express").Router();

router.post("/", addAdmin);
router.get("/", getAdmins);
router.get("/:id", getOneAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;

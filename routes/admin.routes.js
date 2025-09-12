const {
  addAdmin,
  getAdmins,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");
const router = require("express").Router();
const selfGuard = require("../middlewares/guards/self.guard");
const authGuard = require("../middlewares/guards/auth.guard");
const creatorGuard = require("../middlewares/guards/creator.guard");
const roleGuard = require("../middlewares/guards/role.guard");

router.post("/", addAdmin);
router.get("/", getAdmins);
router.get("/:id", authGuard, selfGuard, getOneAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;

const {
  addCurrencyType,
  getCurrencyTypes,
  getOneCurrencyType,
  updateCurrencyType,
  deleteCurrencyType,
} = require("../controllers/currency_type.controller");
const router = require("express").Router();

router.post("/", addCurrencyType);
router.get("/", getCurrencyTypes);
router.get("/:id", getOneCurrencyType);
router.put("/:id", updateCurrencyType);
router.delete("/:id", deleteCurrencyType);

module.exports = router;

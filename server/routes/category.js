const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const router = express.Router();

const { AuthProtect, authorize } = require("../middlewares/routeProtect");
router
  .route("/")
  .get(getCategories)
  .post(AuthProtect, authorize("super_admin"), createCategory);

router
  .route("/:id")
  .put(AuthProtect, authorize("super_admin"), updateCategory)
  .delete(AuthProtect, authorize("super_admin"), deleteCategory);

module.exports = router;

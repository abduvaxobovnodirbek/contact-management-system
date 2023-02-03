const express = require("express");
const router = express.Router();
const {
  getMe,
  statusChange,
  deleteUser,
  updateUser,
  getAllUsers,
} = require("../controllers/user");
const {
  getSavedPosts,
  createSavedPost,
  removeSavedPost,
} = require("../controllers/basket");

const {
  AuthProtect,
  isActiveUser,
  authorize,
} = require("../middlewares/routeProtect");

router.get(
  "/all",
  AuthProtect,
  authorize("admin", "super_admin"),
  getAllUsers
);

router
  .route("/saved-posts")
  .get(AuthProtect, getSavedPosts)
  .post(AuthProtect, isActiveUser, createSavedPost);

router.patch("/saved-posts/:id", AuthProtect, isActiveUser, removeSavedPost);

router.patch(
  "/status/:id",
  AuthProtect,
  authorize("super_admin"),
  statusChange
);

router.get("/me", AuthProtect, isActiveUser, getMe);

router
  .route("/:id")
  .put(AuthProtect, isActiveUser, updateUser)
  .delete(AuthProtect, isActiveUser, authorize("super_admin"), deleteUser);

module.exports = router;

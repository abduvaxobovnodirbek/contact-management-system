const express = require("express");
const router = express.Router();
const { getMe } = require("../controllers/user");
const {
  getSavedPosts,
  createSavedPost,
  removeSavedPost,
} = require("../controllers/basket");

const { AuthProtect, isActiveUser } = require("../middlewares/routeProtect");

router
  .route("/saved-posts")
  .get(AuthProtect, getSavedPosts)
  .post(AuthProtect, isActiveUser, createSavedPost);

router.patch("/saved-posts/:id", AuthProtect, isActiveUser, removeSavedPost);

router.get("/me", AuthProtect, isActiveUser, getMe);

module.exports = router;

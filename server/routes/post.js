const express = require("express");
const router = express.Router();
const {
  getPost,
  getTags,
  getPosts,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/post");

const {
  AuthProtect,
  isActiveUser,
  authorize,
} = require("../middlewares/routeProtect");

router
  .route("/")
  .get(getPosts)
  .post(AuthProtect, isActiveUser, authorize("super_admin"), createPost);

  router.get(
    "/tags",
    AuthProtect,
    isActiveUser,
    authorize("super_admin"),
    getTags
  );
  
router
  .route("/:id")
  .get(getPost)
  .put(AuthProtect, isActiveUser, authorize("super_admin"), updatePost)
  .delete(AuthProtect, isActiveUser, authorize("super_admin"), deletePost);



module.exports = router;

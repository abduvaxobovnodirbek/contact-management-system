const express = require("express");
const {
  getContacts,
  createContact,
  deleteContact,
} = require("../controllers/contact");

const router = express.Router();

const { AuthProtect, isActiveUser } = require("../middlewares/routeProtect");
router
  .route("/")
  .get(AuthProtect, isActiveUser, getContacts)
  .post(AuthProtect, isActiveUser, createContact);

router.route("/:id").delete(AuthProtect, isActiveUser, deleteContact);

module.exports = router;

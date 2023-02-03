const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");

router.post("/email_register", register);
router.post("/email_login", login);

module.exports = router;

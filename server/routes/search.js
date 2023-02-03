const express = require("express");
const { selectedPosts, postFullTextSearch } = require("../controllers/search");

const router = express.Router();

router.route("/selected").get(selectedPosts);
router.route("/full-text-post").get(postFullTextSearch);

module.exports = router;

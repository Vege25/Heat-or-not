"use strict";
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  like_list_get,
  like_get,
  like_post,
} = require("../controllers/likeController");
const { body } = require("express-validator");
const router = express.Router();

router
  .route("/")
  .get(like_list_get)
  .post(
    upload.single("like"),
    body("status").isNumeric(),
    body("CarID").isNumeric(),
    body("UserID").isNumeric(),
    like_post
  );

router.route("/:id").get(like_get);

module.exports = router;

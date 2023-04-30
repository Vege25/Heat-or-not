"use strict";
const express = require("express");
const multer = require("multer");
const { body } = require("express-validator");

const { httpError } = require("../utils/errors");
const {
  car_list_get,
  car_get,
  car_post,
  car_put,
  car_delete,
  lw_list_get,
  lw_put,
} = require("../controllers/carController");

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(httpError("Invalid file", 400));
  }
};

const upload = multer({ dest: "uploads/", fileFilter });
const router = express.Router();

router
  .route("/")
  .get(car_list_get)
  .post(
    upload.single("car"),
    body("Brand").isLength({ min: 1 }).escape(),
    body("Model").isLength({ min: 1 }).escape(),
    body("Description").isLength({ min: 1 }).escape(),
    body("UserID").isNumeric(),
    car_post
  )
  .put(
    body("Brand").isLength({ min: 1 }).escape(),
    body("Model").isLength({ min: 1 }).escape(),
    body("Description").isLength({ min: 1 }).escape(),
    body("CarID").isNumeric(),
    car_put
  );
router.route("/getLW").get(lw_list_get).put(lw_put);

router.route("/:id").get(car_get).delete(car_delete);

module.exports = router;

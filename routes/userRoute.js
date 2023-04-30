"use strict";
const express = require("express");

const {
    getCarOwner,
    getLoggedInUserInfo,
    getUserInfo,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getLoggedInUserInfo);
router.get("/:id", getUserInfo);
router.get("/owner/:id", getCarOwner);

module.exports = router;

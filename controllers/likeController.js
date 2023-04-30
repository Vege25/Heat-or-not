"use strict";
const { getLike, addLike, getLikesInRow } = require("../models/likeModel");
const { httpError, catchError } = require("../utils/errors");
const { validationResult } = require("express-validator");

const like_list_get = async (req, res, next) => {
  try {
    const likes = await getLikesInRow();
    if (likes.length < 1) {
      next(httpError("No likes found", 404));
      return;
    }
    res.json(likes);
  } catch (e) {
    console.error("like_list_get", e.message);
    next(catchError(e));
  }
};

const like_get = async (req, res, next) => {
  try {
    const like = await getLike(req.params.id); // req params id sijasta user db -> lastviewed
    if (like.length < 1) {
      next(httpError("No likes found", 404));
      return;
    }
    res.json(like /*.pop()*/);
  } catch (e) {
    console.error("like_get", e.message);
    next(catchError(e));
  }
};

const like_post = async (req, res, next) => {
  try {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error("like_post", errors.array());
      return next(httpError("Invalid data", 400));
    }

    const data = [
      req.body.status, // req.body.status
      req.body.CarID, // car id
      req.body.UserID, // Logged in user id
      // ALSO REMOVE FORMDATA.append
    ];
    console.log("like_post", data);

    const result = await addLike(data);
    if (result.affectedRows < 1) {
      return next(httpError("Invalid data", 400));
    }
    res.json({
      message: "Liked",
      CarID: req.body.CarID,
    });
  } catch (e) {
    console.error("like_post", e.message);
    next(catchError(e));
  }
};

module.exports = {
  like_list_get,
  like_get,
  like_post,
};

"use strict";

const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const pool = require("../database/db");
const { catchError } = require("../utils/errors");

const getUserDetails = (id) =>
  new Promise((resolve, reject) => {
    pool.query(
      "SELECT hon_user.UserID, hon_user.email, hon_user.Username, hon_user.LastViewed, hon_car.CarID, hon_car.Brand, hon_car.Model, hon_car.Description, hon_car.Image from hon_user LEFT JOIN hon_car ON hon_car.UserID = hon_user.UserID WHERE hon_user.UserID = ?",
      id,
      (err, results) => {
        if (err) {
          console.error("getUserDetails failed for " + id, err);
          return reject(err);
        }

        console.log("getUserDetails for " + id, results);

        const cars = results
          .filter((result) => result.CarID)
          .map((result) => ({
            Brand: result.Brand,
            Description: result.Description,
            CarId: result.CarID,
            Image: result.Image,
            Model: result.Model,
          }));

        const userInfo = {
          Cars: cars,
          email: results[0].email,
          LastViewed: results[0].LastViewed,
          UserID: results[0].UserID,
          Username: results[0].Username,
        };

        console.log("GetUserInfo for " + id, userInfo);
        resolve(userInfo);
      }
    );
  });

//Returns info of the user logged in
exports.getLoggedInUserInfo = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      // 1. Verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.token,
        process.env.JWT_SECRET
      );
      console.log("[getLoggedInUserInfo] decoded token", decoded);

      // 2. Check if the user still exist
      const user = await getUserDetails(decoded.id);
      res.json(user);
    } catch (err) {
      console.log(err);
      next(catchError(err));
    }
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await getUserDetails(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
    next(catchError(err));
  }
};

exports.getCarOwner = async (req, res, next) => {
  const fetchid = req.params.id;
  pool.query(
    "SELECT hon_user.UserID, hon_user.Username, hon_car.CarID FROM ((hon_user INNER JOIN hon_car ON hon_car.UserID = hon_user.UserID) INNER JOIN hon_likes ON hon_likes.UserID = hon_user.UserID) WHERE hon_car.UserID = hon_user.UserID AND hon_car.CarID = ? LIMIT 1;",
    fetchid,
    (err, results) => {
      if (err) {
        console.log(err);
        return next(catchError(err));
      }
      let value = JSON.parse(JSON.stringify(results));
      console.log(value);
      res.json(results);
    }
  );
};

"use strict";
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getLikesInRow = async () => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT CarID, COUNT(Status) AS likes
      FROM hon_likes
      WHERE Status = true
      GROUP BY  CarID
      ORDER BY COUNT(Status) DESC
      LIMIT 10;`
    );
    return rows;
  } catch (e) {
    console.error("getLikesInRow", e.message);
    throw httpError("Database error", 500);
  }
};

const getLike = async (carID) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT COUNT(hon_likes.Status) AS likes
      FROM ((hon_likes
      INNER JOIN hon_car ON hon_likes.CarID = hon_car.CarID)
      INNER JOIN hon_user ON hon_likes.UserID = hon_user.UserID)
      WHERE hon_likes.CarID = ? AND Status = true;`,
      [carID]
    );
    return rows;
  } catch (e) {
    console.error("getLike", e.message);
    throw httpError("Database error", 500);
  }
};
//TODO getDislike

const addLike = async (data) => {
  try {
    const [rows] = await promisePool.execute(
      `INSERT INTO hon_likes (Status, hon_likes.CarID, hon_likes.UserID) VALUES (?, ?, ?);`,
      data
    );
    if (rows.affectedRows >= 1) {
      // Update user's last viewed value
      data.shift();
      await promisePool.execute(
          `UPDATE hon_user set LastViewed = ? where UserID = ?;`,
          data
      );
    }

    return rows;
  } catch (e) {
    console.error("addLike", e.message);
    throw httpError("Database error", 500);
  }
};

module.exports = {
  getLikesInRow,
  getLike,
  addLike,
};

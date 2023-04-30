"use strict";
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllCars = async () => {
  try {
    const [rows] =
      await promisePool.execute(`SELECT CarID, Brand, Model, Description, Image, hon_user.UserID
                                    FROM hon_car JOIN hon_user
                                    ON hon_user.UserID = hon_car.UserID;`);
    return rows;
  } catch (e) {
    console.error("getAllCars", e.message);
    throw httpError("Database error", 500);
  }
};

const getCar = async (carID) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT CarID, Brand, Model, Description, Image, hon_user.UserID, hon_user.Username
      FROM hon_car 
      JOIN hon_user 
      ON hon_user.UserID = hon_car.UserID 
      WHERE carID = ?;`,
      [carID]
    );
    return rows;
  } catch (e) {
    console.error("getCar", e.message);
    throw httpError("Database error", 500);
  }
};

const addCar = async (data) => {
  try {
    const [rows] = await promisePool.execute(
      `INSERT INTO hon_car (Brand, Model, Description, UserID, Image) VALUES (?, ?, ?, ?, ?);`,
      data
    );
    return rows;
  } catch (e) {
    console.error("addCar", e.message);
    throw httpError("Database error", 500);
  }
};

const updateCar = async (data) => {
  try {
    const [rows] = await promisePool.execute(
      `UPDATE hon_car set Brand = ?, Model = ?, Description = ?, Image = ? WHERE CarID = ?;`,
      data
    );
    return rows;
  } catch (e) {
    console.error("updateCar", e.message);
    throw httpError("Database error", 500);
  }
};
const getAllLw = async (next) => {
  try {
    const [rows] = await promisePool.execute(`SELECT * FROM hon_user;`);
    return rows;
  } catch (e) {
    console.error("getAllLw", e.message);
    next(httpError("Database error", 500));
  }
};
const updateLW = async (data, next) => {
  try {
    const [rows] = await promisePool.execute(
      `UPDATE hon_user SET LastViewed= ? WHERE UserID = ?;`,
      data
    );
    return rows;
  } catch (e) {
    console.error("updateLW", e.message);
    next(httpError("Database error", 500));
  }
};

const deleteCar = async (carID) => {
  try {
    const [rows] = await promisePool.execute(
      `DELETE FROM hon_car where CarID = ?;`,
      [carID]
    );
    return rows;
  } catch (e) {
    console.error("deleteCar", e.message);
    throw httpError("Database error", 500);
  }
};

module.exports = {
  getAllCars,
  getCar,
  addCar,
  updateCar,
  deleteCar,
  updateLW,
  getAllLw,
};

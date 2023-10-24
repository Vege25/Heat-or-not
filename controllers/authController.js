const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const pool = require("../database/db");
const express = require("express");
const { json } = require("express");
let username;

exports.login = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      console.log("Missing email or password");
      return res.redirect("../login");
    }

    pool.query(
      "SELECT * FROM hon_user WHERE email = ?",
      [email],
      async (err, results) => {
        console.log(results);
        let sqlResult = JSON.stringify(results);
        console.log(sqlResult);
        if (!sqlResult.includes("email")) {
          return res.redirect("../login");
        }

        if (
          !results ||
          !(await bcrypt.compare(password, results[0].Password))
        ) {
          console.log(results[0].email);
          console.log("Wrong PAss");
          return res.redirect("../login");
        }

        const id = results[0].UserID;
        username = results[0].Username;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        console.log(token);

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };
        res.cookie("token", token, cookieOptions);
        res.status(200).redirect("../front");
        console.log("LOGGED IN AS = " + username); //////////////////
      }
    );
  } catch (err) {
    console.log(err);
    return res.redirect("../login");
  }
};

exports.register = (req, res) => {
  console.log(req.body);
  const { name, email, password, passwordConfirm } = req.body;
  pool.query(
    "SELECT email from hon_user WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.log(err);
        return res.redirect("../register");
      }
      if (results.length > 0) {
        console.log("Sposti varattu");
        return res.redirect("../register");
      }
      if (password !== passwordConfirm) {
        console.log("Passwords do not match !");
        return res.redirect("../register");
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      pool.query(
        "INSERT INTO hon_user SET ?",
        {
          Username: name,
          email: email,
          Password: hashedPassword,
          LastViewed: 1,
        },
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.log("User succesfully created");
            res.redirect("../login");
          }
        }
      );
    }
  );
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      // 1. Verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.token,
        process.env.JWT_SECRET
      );
      console.log(decoded);

      // 2. Check if the user still exist
      pool.query(
        "SELECT * FROM hon_user WHERE UserID = ?",
        [decoded.id],
        (err, results) => {
          console.log(results);
          // console.log("test id " + JSON.stringify(results));
          const gg = JSON.stringify(results);
          if (!results) {
            return next();
          }
          req.user = results[0];
          return next();
        }
      );
    } catch (err) {
      console.log(err);
      return next();
    }
  } else {
    next();
  }
};
exports.logout = (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(200).redirect("../login");
};

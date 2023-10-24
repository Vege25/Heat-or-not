// "use strict";
// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql2");
// const cookieParser = require("cookie-parser");
// const { httpError } = require("./utils/errors");
// const authRoute = require("./routes/authRoute");
// const carRoute = require("./routes/carRoute");
// const likeRoute = require("./routes/likeRoute");
// const pagesRoute = require("./routes/pagesRoute");
// const userRoute = require("./routes/userRoute");

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// db.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("MYSQL CONNECTED");
//   }
// });

// const port = 3000;

// const app = express();
// app.use(cors());
// app.use(express.static("ui"));
// app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(express.static("uploads"));
// app.use("/thumbnails", express.static("thumbnails"));
// app.use(cookieParser());
// app.set("view engine", "html");

// // Define Routes
// app.use("/", pagesRoute);
// app.use("/auth", authRoute);
// app.use("/car", carRoute);
// app.use("/like", likeRoute);
// app.use("/user", userRoute);

// app.use((req, res, next) => {
//   const err = httpError("Not found", 404);
//   next(err);
// });

// app.use((err, req, res, next) => {
//   res
//     .status(err.status || 500)
//     .json({ message: err.message || "Internal server error" });
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

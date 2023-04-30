"use strict";
const httpError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const catchError = (e) => {
  if (e && e.status) {
    // Error was already a HTTP error
    return e;
  }
  return httpError("Internal server error", 500)
}

module.exports = { httpError, catchError };

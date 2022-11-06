const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    req.user = req.token;
    next();
  } catch (error) {
    res.send(error.message);
  }
};

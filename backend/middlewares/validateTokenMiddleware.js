const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    if (!req.headers.authorization) {
      throw new Error("Authorization header is not provided.");
    }

    if (!req.headers.authorization.startsWith("Bearer")) {
      throw new Error("Invalide token type.");
    }

    const token = req.headers.authorization.split(" ")[1];
    const decodedData = JWT.verify(token, process.env.JWT_SECRET_KEY);

    req.token = decodedData;
    next();
  } catch (error) {
    res.send(error.message);
  }
};

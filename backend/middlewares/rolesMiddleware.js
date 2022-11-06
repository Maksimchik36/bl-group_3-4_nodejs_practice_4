const JWT = require("jsonwebtoken");

module.exports = (rolesArr) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const { roles } = req.token;
      let hasRole = false;
      rolesArr.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ message: "No access rights." });
      }
      next();
    } catch (error) {
      return res.send(error.message);
    }
  };
};

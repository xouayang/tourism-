const jwt = require("jsonwebtoken");
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json("No token provided");
  } else {
    const payload = await jwt.verify(token, process.env.TOKEN_SECRET);
    if (!payload) {
      return res.status(401).json("No authorized");
    } else {
      req.payload = payload;
    }
  }
  next();
};

const getRoles = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json("No token provided");
  } else {
    const roles = await jwt.verify(token, process.env.TOKEN_SECRET);
    if (!roles) {
      return res.status(401).json("No authorized");
    } else {
      req.roles = roles;
    }
  }
  next();
};

module.exports = { authenticateToken, getRoles };

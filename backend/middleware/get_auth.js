// Middleware get_auth.js
const jwt = require("jsonwebtoken");
const JWT_SECRETE = "ayminisagoodgir@l";

const get_auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRETE);
    req.User = data.User;
    next();
  } catch (error) {
    res.status(401).send({ error: "Error on middleware... Please authenticate using valid token" });
  }
};

module.exports = get_auth;

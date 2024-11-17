const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const token = req.cookies["auth_token"];

  if (!token) {
    return res.status(400).json({ message: "Unathorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.HASH);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unathorized" });
  }
};

module.exports = isAuth;

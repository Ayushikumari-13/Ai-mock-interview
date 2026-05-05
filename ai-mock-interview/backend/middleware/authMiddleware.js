const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // token header se lo
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // "Bearer token" format handle karo
    const cleanToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    // verify token
    const decoded = jwt.verify(cleanToken, "secret");

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
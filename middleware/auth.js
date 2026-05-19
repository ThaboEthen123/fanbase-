
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Invalid token format"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        error: "Token invalid"
      });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized access"
    });
  }
};

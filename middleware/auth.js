const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // FIX: consistent user object
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    if (!req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Invalid token payload"
      });
    }

    next();

  } catch (err) {
    console.log("AUTH ERROR:", err.message);

    return res.status(401).json({
      success: false,
      error: "Unauthorized access"
    });
  }
};

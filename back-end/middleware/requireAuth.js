const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await userModel.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    return res.status(401).json({ error: "request is not authorized" });
  }
};

const allowAccessWithoutToken = (req, res, next) => {
  const excludedRoutes = ["/user/login", "/user/signup"]; // Define routes that should not require a token
  if (excludedRoutes.includes(req.path)) {
    return next(); // Allow access to the specified routes without token verification
  }

  // For other routes, perform authentication
  requireAuth(req, res, next);
};

module.exports = { requireAuth, allowAccessWithoutToken };

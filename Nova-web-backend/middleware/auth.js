const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send("Access denied. No token provided.");
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

const authorize = (roles) => (req, res, next) => {
    console.log(roles)
  if (!roles.includes(req.body.role)) {
    return res.status(403).send("Access denied.");
  }
  next();
};

module.exports = { authenticate, authorize };

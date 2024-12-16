const rateLimit = require("express-rate-limit");

// General Rate Limiter for All Routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Increased from 100 to 300 requests per 15 minutes
  message: "Too many requests from this IP, please try again after 15 minutes.",
  standardHeaders: true, // Send rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

// Rate Limiter for Auth Routes (Stricter)
const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // Limit each IP to 10 login/signup requests
  message: "Too many login/signup attempts. Please try again after 10 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Export Limiters
module.exports = {
  generalLimiter,
  authLimiter
};

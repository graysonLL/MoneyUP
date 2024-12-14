const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authLimiter = require("../middleware/rateLimiter")

router.post("/register", authLimiter, authController.register);
router.post("/login", authLimiter, authController.login);
router.get("/user", authLimiter, authController.getUser);
router.put("/update-profile", authLimiter, authController.updateProfile);

module.exports = router;

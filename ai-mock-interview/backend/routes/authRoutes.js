const router = require("express").Router();

// 🔥 सही नाम import करो
const { registerUser, loginUser } = require("../controllers/authController");

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

module.exports = router;
const express = require("express");

const { register, me } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);

router.get("/me", authMiddleware, me);

module.exports = router;
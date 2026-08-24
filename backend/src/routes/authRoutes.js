const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    res.status(201).json({
        message: "Cadastro recebido com sucesso!",
        user: {
            name,
            email,
            passwordHash
        }
    });
});

module.exports = router;
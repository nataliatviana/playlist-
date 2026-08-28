const { registerUser } = require("../services/authService");
const { validateRegister } = require("../utils/validation");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const errors = validateRegister(name, email, password);

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Dados inválidos.",
            errors
        });
    }

    const user = await registerUser(name, email, password);

    return res.status(201).json({
        success: true,
        message: "Cadastro recebido com sucesso!",
        user
    });
};

const me = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Usuário autenticado.",
        userId: req.userId
    });
};

module.exports = {
    register,
    me
};
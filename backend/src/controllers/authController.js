const { registerUser, loginUser, getUserById } = require("../services/authService");
const { validateRegister, validateLogin } = require("../utils/validation");

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

const login = async (req, res) => {
    const { email, password } = req.body;

    const errors = validateLogin(email, password);

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Dados inválidos.",
            errors
        });
    }

    const result = await loginUser(email, password);

    return res.status(200).json({
        success: true,
        message: "Login realizado com sucesso!",
        token: result.token
    });
};

const me = async (req, res) => {
    const user = await getUserById(req.userId);

    return res.status(200).json({
        success: true,
        message: "Usuário autenticado.",
        user
    });
};

module.exports = {
    register,
    login,
    me
};
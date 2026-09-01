const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (name, email, password) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("E-mail já cadastrado.");
        error.status = 409;
        throw error;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: passwordHash
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("Credenciais inválidas.");
        error.status = 401;
        throw error;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        const error = new Error("Credenciais inválidas.");
        error.status = 401;
        throw error;
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return {
        token
    };
};

const getUserById = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("Usuário não encontrado.");
        error.status = 404;
        throw error;
    }

    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
};

module.exports = {
    registerUser,
    loginUser,
    getUserById
};
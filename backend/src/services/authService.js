const bcrypt = require("bcryptjs");
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

module.exports = {
    registerUser
};
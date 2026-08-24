const bcrypt = require("bcryptjs");

const registerUser = async (name, email, password) => {
    const passwordHash = await bcrypt.hash(password, 10);

    return {
        name,
        email,
        passwordHash
    };
};

module.exports = {
    registerUser
};
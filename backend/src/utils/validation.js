const validateRegister = (name, email, password) => {
    const errors = [];

    if (!name || name.trim() === "") {
        errors.push("Nome é obrigatório.");
    }

    if (!email || email.trim() === "") {
        errors.push("E-mail é obrigatório.");
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            errors.push("E-mail inválido.");
        }
    }

    if (!password || password.trim() === "") {
        errors.push("Senha é obrigatória.");
    } else if (password.length < 6) {
        errors.push("A senha deve possuir pelo menos 6 caracteres.");
    }

    return errors;
};

module.exports = {
    validateRegister
};
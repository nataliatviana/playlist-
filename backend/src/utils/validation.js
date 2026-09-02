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

const validateLogin = (email, password) => {

    const errors = [];

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

    }

    return errors;

};

const validateArtist = (name, bio) => {

    const errors = [];

    if (!name || name.trim() === "") {

        errors.push("Nome do artista é obrigatório.");

    }

    if (bio !== undefined && bio !== null && typeof bio !== "string") {

        errors.push("Biografia deve ser um texto.");

    }

    return errors;

};

const validateAlbum = (title, releaseYear, artist) => {

    const errors = [];

    if (!title || title.trim() === "") {

        errors.push("Título do álbum é obrigatório.");

    }

    if (
        releaseYear !== undefined &&
        releaseYear !== null &&
        (typeof releaseYear !== "number" || !Number.isInteger(releaseYear))
    ) {

        errors.push("Ano de lançamento deve ser um número inteiro.");

    }

    if (!artist || artist.trim() === "") {

        errors.push("Artista é obrigatório.");

    }

    return errors;

};

const validateGenre = (name) => {

    const errors = [];

    if (!name || name.trim() === "") {

        errors.push("Nome do gênero é obrigatório.");

    }

    return errors;

};

module.exports = {

    validateRegister,
    validateLogin,
    validateArtist,
    validateAlbum,
    validateGenre

};
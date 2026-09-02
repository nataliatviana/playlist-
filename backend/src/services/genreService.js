const Genre = require("../models/Genre");

const createGenre = async (name) => {
    const genre = await Genre.create({
        name
    });

    return genre;
};

const getGenres = async () => {
    const genres = await Genre.find();

    return genres;
};

const getGenreById = async (id) => {
    const genre = await Genre.findById(id);

    if (!genre) {
        const error = new Error("Gênero não encontrado.");
        error.status = 404;
        throw error;
    }

    return genre;
};

const updateGenre = async (id, name) => {
    const genre = await Genre.findByIdAndUpdate(
        id,
        {
            name
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!genre) {
        const error = new Error("Gênero não encontrado.");
        error.status = 404;
        throw error;
    }

    return genre;
};

const deleteGenre = async (id) => {
    const genre = await Genre.findByIdAndDelete(id);

    if (!genre) {
        const error = new Error("Gênero não encontrado.");
        error.status = 404;
        throw error;
    }

    return genre;
};

module.exports = {
    createGenre,
    getGenres,
    getGenreById,
    updateGenre,
    deleteGenre
};
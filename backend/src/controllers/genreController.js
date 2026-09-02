const {
    createGenre,
    getGenres,
    getGenreById,
    updateGenre,
    deleteGenre
} = require("../services/genreService");

const { validateGenre } = require("../utils/validation");

const create = async (req, res) => {
    const { name } = req.body;

    const errors = validateGenre(name);

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Dados inválidos.",
            errors
        });
    }

    const genre = await createGenre(name);

    return res.status(201).json({
        success: true,
        message: "Gênero criado com sucesso!",
        genre
    });
};

const list = async (req, res) => {
    const genres = await getGenres();

    return res.status(200).json({
        success: true,
        genres
    });
};

const getById = async (req, res) => {
    const genre = await getGenreById(req.params.id);

    return res.status(200).json({
        success: true,
        genre
    });
};

const update = async (req, res) => {
    const { name } = req.body;

    const errors = validateGenre(name);

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Dados inválidos.",
            errors
        });
    }

    const genre = await updateGenre(req.params.id, name);

    return res.status(200).json({
        success: true,
        message: "Gênero atualizado com sucesso!",
        genre
    });
};

const remove = async (req, res) => {
    const genre = await deleteGenre(req.params.id);

    return res.status(200).json({
        success: true,
        message: "Gênero excluído com sucesso!",
        genre
    });
};

module.exports = {
    create,
    list,
    getById,
    update,
    remove
};
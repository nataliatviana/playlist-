const {
    createArtist,
    getArtists,
    getArtistById,
    updateArtist,
    deleteArtist
} = require("../services/artistService");

const { validateArtist } = require("../utils/validation");

const create = async (req, res) => {
    const { name, bio } = req.body;

    const errors = validateArtist(name, bio);

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Dados inválidos.",
            errors
        });
    }

    const artist = await createArtist(name, bio);

    return res.status(201).json({
        success: true,
        message: "Artista criado com sucesso!",
        artist
    });
};

const list = async (req, res) => {
    const artists = await getArtists();

    return res.status(200).json({
        success: true,
        artists
    });
};

const getById = async (req, res) => {
    const artist = await getArtistById(req.params.id);

    return res.status(200).json({
        success: true,
        artist
    });
};

const update = async (req, res) => {
    const { name, bio } = req.body;

    const errors = validateArtist(name, bio);

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Dados inválidos.",
            errors
        });
    }

    const artist = await updateArtist(req.params.id, name, bio);

    return res.status(200).json({
        success: true,
        message: "Artista atualizado com sucesso!",
        artist
    });
};

const remove = async (req, res) => {
    const artist = await deleteArtist(req.params.id);

    return res.status(200).json({
        success: true,
        message: "Artista excluído com sucesso!",
        artist
    });
};

module.exports = {
    create,
    list,
    getById,
    update,
    remove
};
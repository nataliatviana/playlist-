const {
    createAlbum,
    getAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
    getSongsByAlbum
} = require("../services/albumService");

const { validateAlbum } = require("../utils/validation");

const create = async (req, res) => {
    const { title, releaseYear, artist } = req.body;

    const errors = validateAlbum(title, releaseYear, artist);

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Dados inválidos.",
            errors
        });
    }

    const album = await createAlbum(
        title,
        releaseYear,
        artist
    );

    return res.status(201).json({
        success: true,
        message: "Álbum criado com sucesso!",
        album
    });
};

const list = async (req, res) => {
    const { search } = req.query;

    const albums = await getAlbums(search);

    return res.status(200).json({
        success: true,
        albums
    });
};

const getById = async (req, res) => {
    const album = await getAlbumById(req.params.id);

    return res.status(200).json({
        success: true,
        album
    });
};

const update = async (req, res) => {
    const { title, releaseYear, artist } = req.body;

    const errors = validateAlbum(title, releaseYear, artist);

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Dados inválidos.",
            errors
        });
    }

    const album = await updateAlbum(
        req.params.id,
        title,
        releaseYear,
        artist
    );

    return res.status(200).json({
        success: true,
        message: "Álbum atualizado com sucesso!",
        album
    });
};

const remove = async (req, res) => {
    const album = await deleteAlbum(req.params.id);

    return res.status(200).json({
        success: true,
        message: "Álbum excluído com sucesso!",
        album
    });
};

const songs = async (req, res) => {
    const songs = await getSongsByAlbum(req.params.id);

    return res.status(200).json({
        success: true,
        songs
    });
};

module.exports = {
    create,
    list,
    getById,
    update,
    remove,
    songs
};
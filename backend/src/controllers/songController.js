const {
    createSong,
    getSongs,
    getSongById,
    updateSong,
    deleteSong
} = require("../services/songService");

const { validateSong } = require("../utils/validation");

const create = async (req, res) => {
    const {
        title,
        duration,
        artist,
        album,
        genre
    } = req.body;

    const errors = validateSong(
        title,
        duration,
        artist,
        album,
        genre
    );

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Dados inválidos.",
            errors
        });
    }

    const song = await createSong(
        title,
        duration,
        artist,
        album,
        genre
    );

    return res.status(201).json({
        success: true,
        message: "Música criada com sucesso!",
        song
    });
};

const list = async (req, res) => {
    const { search } = req.query;

    const songs = await getSongs(search);

    return res.status(200).json({
        success: true,
        songs
    });
};

const getById = async (req, res) => {
    const song = await getSongById(req.params.id);

    return res.status(200).json({
        success: true,
        song
    });
};

const update = async (req, res) => {
    const {
        title,
        duration,
        artist,
        album,
        genre
    } = req.body;

    const errors = validateSong(
        title,
        duration,
        artist,
        album,
        genre
    );

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Dados inválidos.",
            errors
        });
    }

    const song = await updateSong(
        req.params.id,
        title,
        duration,
        artist,
        album,
        genre
    );

    return res.status(200).json({
        success: true,
        message: "Música atualizada com sucesso!",
        song
    });
};

const remove = async (req, res) => {
    const song = await deleteSong(req.params.id);

    return res.status(200).json({
        success: true,
        message: "Música excluída com sucesso!",
        song
    });
};

module.exports = {
    create,
    list,
    getById,
    update,
    remove
};
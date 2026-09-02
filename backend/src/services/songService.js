const Song = require("../models/Song");

const createSong = async (title, duration, artist, album, genre) => {
    const song = await Song.create({
        title,
        duration,
        artist,
        album,
        genre
    });

    return song;
};

const getSongs = async (search) => {
    const filter = {};

    if (search) {
        filter.title = {
            $regex: search,
            $options: "i"
        };
    }

    const songs = await Song.find(filter)
        .populate("artist")
        .populate("album")
        .populate("genre");

    return songs;
};

const getSongById = async (id) => {
    const song = await Song.findById(id)
        .populate("artist")
        .populate("album")
        .populate("genre");

    if (!song) {
        const error = new Error("Música não encontrada.");
        error.status = 404;
        throw error;
    }

    return song;
};

const updateSong = async (
    id,
    title,
    duration,
    artist,
    album,
    genre
) => {
    const song = await Song.findByIdAndUpdate(
        id,
        {
            title,
            duration,
            artist,
            album,
            genre
        },
        {
            new: true,
            runValidators: true
        }
    )
        .populate("artist")
        .populate("album")
        .populate("genre");

    if (!song) {
        const error = new Error("Música não encontrada.");
        error.status = 404;
        throw error;
    }

    return song;
};

const deleteSong = async (id) => {
    const song = await Song.findByIdAndDelete(id);

    if (!song) {
        const error = new Error("Música não encontrada.");
        error.status = 404;
        throw error;
    }

    return song;
};

module.exports = {
    createSong,
    getSongs,
    getSongById,
    updateSong,
    deleteSong
};
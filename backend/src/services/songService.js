const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Genre = require("../models/Genre");

const createSong = async (title, duration, artist, album, genre) => {
    const artistExists = await Artist.findById(artist);

    if (!artistExists) {
        const error = new Error("Artista não encontrado.");
        error.status = 404;
        throw error;
    }

    if (album) {
        const albumExists = await Album.findById(album);

        if (!albumExists) {
            const error = new Error("Álbum não encontrado.");
            error.status = 404;
            throw error;
        }
    }

    const genreExists = await Genre.findById(genre);

    if (!genreExists) {
        const error = new Error("Gênero não encontrado.");
        error.status = 404;
        throw error;
    }

    const song = await Song.create({
        title,
        duration,
        artist,
        album,
        genre
    });

    return song;
};

const getSongs = async () => {
    const songs = await Song.find()
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

const updateSong = async (id, title, duration, artist, album, genre) => {
    const artistExists = await Artist.findById(artist);

    if (!artistExists) {
        const error = new Error("Artista não encontrado.");
        error.status = 404;
        throw error;
    }

    if (album) {
        const albumExists = await Album.findById(album);

        if (!albumExists) {
            const error = new Error("Álbum não encontrado.");
            error.status = 404;
            throw error;
        }
    }

    const genreExists = await Genre.findById(genre);

    if (!genreExists) {
        const error = new Error("Gênero não encontrado.");
        error.status = 404;
        throw error;
    }

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
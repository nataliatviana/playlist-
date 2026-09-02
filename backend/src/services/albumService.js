const Album = require("../models/Album");

const createAlbum = async (title, releaseYear, artist) => {
    const album = await Album.create({
        title,
        releaseYear,
        artist
    });

    return album;
};

const getAlbums = async (search) => {
    const filter = {};

    if (search) {
        filter.title = {
            $regex: search,
            $options: "i"
        };
    }

    const albums = await Album.find(filter)
        .populate("artist");

    return albums;
};

const getAlbumById = async (id) => {
    const album = await Album.findById(id)
        .populate("artist");

    if (!album) {
        const error = new Error("Álbum não encontrado.");
        error.status = 404;
        throw error;
    }

    return album;
};

const updateAlbum = async (id, title, releaseYear, artist) => {
    const album = await Album.findByIdAndUpdate(
        id,
        {
            title,
            releaseYear,
            artist
        },
        {
            new: true,
            runValidators: true
        }
    ).populate("artist");

    if (!album) {
        const error = new Error("Álbum não encontrado.");
        error.status = 404;
        throw error;
    }

    return album;
};

const deleteAlbum = async (id) => {
    const album = await Album.findByIdAndDelete(id);

    if (!album) {
        const error = new Error("Álbum não encontrado.");
        error.status = 404;
        throw error;
    }

    return album;
};

const getSongsByAlbum = async (albumId) => {
    const Song = require("../models/Song");

    const songs = await Song.find({
        album: albumId
    })
        .populate("artist")
        .populate("album")
        .populate("genre");

    return songs;
};

module.exports = {
    createAlbum,
    getAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
    getSongsByAlbum
};
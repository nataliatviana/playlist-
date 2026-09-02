const Album = require("../models/Album");
const Artist = require("../models/Artist");

const createAlbum = async (title, releaseYear, artistId) => {
    const artist = await Artist.findById(artistId);

    if (!artist) {
        const error = new Error("Artista não encontrado.");
        error.status = 404;
        throw error;
    }

    const album = await Album.create({
        title,
        releaseYear,
        artist: artistId
    });

    return album;
};

const getAlbums = async () => {
    const albums = await Album.find().populate("artist");

    return albums;
};

const getAlbumById = async (id) => {
    const album = await Album.findById(id).populate("artist");

    if (!album) {
        const error = new Error("Álbum não encontrado.");
        error.status = 404;
        throw error;
    }

    return album;
};

const updateAlbum = async (id, title, releaseYear, artistId) => {
    const artist = await Artist.findById(artistId);

    if (!artist) {
        const error = new Error("Artista não encontrado.");
        error.status = 404;
        throw error;
    }

    const album = await Album.findByIdAndUpdate(
        id,
        {
            title,
            releaseYear,
            artist: artistId
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

module.exports = {
    createAlbum,
    getAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum
};
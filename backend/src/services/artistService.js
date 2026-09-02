const Artist = require("../models/Artist");

const createArtist = async (name, bio) => {
    const artist = await Artist.create({
        name,
        bio
    });

    return artist;
};

const getArtists = async (search) => {
    const filter = {};

    if (search) {
        filter.name = {
            $regex: search,
            $options: "i"
        };
    }

    const artists = await Artist.find(filter);

    return artists;
};

const getArtistById = async (id) => {
    const artist = await Artist.findById(id);

    if (!artist) {
        const error = new Error("Artista não encontrado.");
        error.status = 404;
        throw error;
    }

    return artist;
};

const updateArtist = async (id, name, bio) => {
    const artist = await Artist.findByIdAndUpdate(
        id,
        {
            name,
            bio
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!artist) {
        const error = new Error("Artista não encontrado.");
        error.status = 404;
        throw error;
    }

    return artist;
};

const deleteArtist = async (id) => {
    const artist = await Artist.findByIdAndDelete(id);

    if (!artist) {
        const error = new Error("Artista não encontrado.");
        error.status = 404;
        throw error;
    }

    return artist;
};

const getAlbumsByArtist = async (artistId) => {
    const Album = require("../models/Album");

    const albums = await Album.find({
        artist: artistId
    }).populate("artist");

    return albums;
};

const getSongsByArtist = async (artistId) => {
    const Song = require("../models/Song");

    const songs = await Song.find({
        artist: artistId
    })
        .populate("artist")
        .populate("album")
        .populate("genre");

    return songs;
};

module.exports = {
    createArtist,
    getArtists,
    getArtistById,
    updateArtist,
    deleteArtist,
    getAlbumsByArtist,
    getSongsByArtist
};
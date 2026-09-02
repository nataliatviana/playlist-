const Artist = require("../models/Artist");

const createArtist = async (name, bio) => {
    const artist = await Artist.create({
        name,
        bio
    });

    return artist;
};

const getArtists = async () => {
    const artists = await Artist.find();

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

module.exports = {
    createArtist,
    getArtists,
    getArtistById,
    updateArtist,
    deleteArtist
};
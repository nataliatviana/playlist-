const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Genre = require("../models/Genre");

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

const getSongs = async (search, genre, artist, album) => {
    const filter = {};

    // Pesquisa por título
    if (search) {
        filter.title = {
            $regex: search,
            $options: "i"
        };
    }

    // Filtro por gênero
    if (genre) {
        const genres = await Genre.find({
            name: {
                $regex: genre,
                $options: "i"
            }
        }).select("_id");

        filter.genre = {
            $in: genres.map((item) => item._id)
        };
    }

    // Filtro por artista
    if (artist) {
        const artists = await Artist.find({
            name: {
                $regex: artist,
                $options: "i"
            }
        }).select("_id");

        filter.artist = {
            $in: artists.map((item) => item._id)
        };
    }

    // Filtro por álbum
    if (album) {
        const albums = await Album.find({
            title: {
                $regex: album,
                $options: "i"
            }
        }).select("_id");

        filter.album = {
            $in: albums.map((item) => item._id)
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
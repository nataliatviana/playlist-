const express = require("express");

const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const artistRoutes = require("./routes/artistRoutes");

const albumRoutes = require("./routes/albumRoutes");

const genreRoutes = require("./routes/genreRoutes");

const songRoutes = require("./routes/songRoutes");

const errorHandler = require("./middlewares/errorMiddleware");

const notFoundMiddleware = require("./middlewares/notFoundMiddleware");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/artists", artistRoutes);

app.use("/api/albums", albumRoutes);

app.use("/api/genres", genreRoutes);

app.use("/api/songs", songRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Playlist+ API funcionando!"
    });
});

app.use(notFoundMiddleware);

app.use(errorHandler);

module.exports = app;
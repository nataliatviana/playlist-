const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

const authRoutes = require("./routes/authRoutes");
const artistRoutes = require("./routes/artistRoutes");
const albumRoutes = require("./routes/albumRoutes");
const genreRoutes = require("./routes/genreRoutes");
const songRoutes = require("./routes/songRoutes");

const errorHandler = require("./middlewares/errorMiddleware");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const getGraphqlContext = ({ req }) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return {};
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return {};
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        return { userId };
    } catch {
        return {};
    }
};

async function createApp() {
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

    const apolloServer = new ApolloServer({ typeDefs, resolvers });

    await apolloServer.start();

    app.use(
        "/graphql",
        expressMiddleware(apolloServer, {
            context: getGraphqlContext
        })
    );

    app.use(notFoundMiddleware);
    app.use(errorHandler);

    return app;
}

module.exports = createApp;
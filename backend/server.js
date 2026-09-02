require("dotenv").config();

const createApp = require("./src/app");
const connectDatabase = require("./src/config/database");

const PORT = process.env.PORT || 3000;

connectDatabase().then(async () => {
    const app = await createApp();

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
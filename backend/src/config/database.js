const dns = require("dns");
const mongoose = require("mongoose");

// Em alguns ambientes Windows (VPN/adaptadores virtuais), o resolvedor DNS
// padrão do Node não consegue resolver o SRV do mongodb+srv://. Forçar um
// DNS público evita o erro "querySrv ECONNREFUSED".
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB conectado com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);

        process.exit(1);
    }
};

module.exports = connectDatabase;

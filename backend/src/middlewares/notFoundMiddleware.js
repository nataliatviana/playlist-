const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Recurso não encontrado."
    });
};

module.exports = notFoundMiddleware;
const express = require("express");

const {
    create,
    list,
    getById,
    update,
    remove
} = require("../controllers/albumController");

const router = express.Router();

router.post("/", create);

router.get("/", list);

router.get("/:id", getById);

router.put("/:id", update);

router.delete("/:id", remove);

module.exports = router;
module.exports = app => {
    const messages = require("../controllers/message.controller.js");

    var router = require("express").Router();
    router.post("/", messages.create);
    router.get("/:id", messages.findOne);
    router.get("/", messages.findAll);
    router.delete("/:id", messages.delete);
    router.delete("/", messages.deleteAll);
    app.use('/backend/models', router);
};

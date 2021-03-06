module.exports = app => {
    const trip_photos = require("../controllers/trip_photo.controller.js");

    var router = require("express").Router();
    router.post("/", trip_photos.create);
    router.get("/:id", trip_photos.findOne);
    router.get("/", trip_photos.findAll);
    router.delete("/:id", trip_photos.delete);
    router.delete("/", trip_photos.deleteAll);
    app.use('/backend/models', router);
};

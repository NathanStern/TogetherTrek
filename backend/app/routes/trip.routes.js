module.exports = app => {
  const trip_controller = require("../controllers/trip.controller.js");
  var router = require("express").Router();

  // Creates an entry in the trips table
  router.post("/", trip_controller.create);

  // Retrieves an entry from the trips table by id
  router.get("/:id", trip_controller.findOne);

  // Retrieves entries from the trips table by search criteria
  router.get("/", trip_controller.findAll);

  // Updates an entry in the trips table by id
  router.put("/:id", trip_controller.update);

  // Deletes an entry in the trips table by id
  router.delete("/:id", trip_controller.delete);

  app.use("/trips", router);
};

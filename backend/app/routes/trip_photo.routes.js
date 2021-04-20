module.exports = app => {
  const trip_photo_controller =
  require("../controllers/trip_photo.controller.js");
  var router = require("express").Router();

  // Creates an entry in the trip_photos table
  router.post("/", trip_photo_controller.create);

  // Retrieves an entry from the trip_photos table by id
  router.get("/:id", trip_photo_controller.findOne);
	
 
 //Retrieves entries from the trip_photos table by trip_id
  router.get('/trip/:id', trip_photo_controller.findAllId)
  
  // Retrieves entries from the trip_photos table by search criteria
  router.get("/", trip_photo_controller.findAll);

  // Updates an entry in the trip_photos table by id
  router.put("/:id", trip_photo_controller.update);

  // Deletes an entry in the trip_photos table by id
  router.delete("/:id", trip_photo_controller.delete);

  app.use("/trip_photos", router);
};

module.exports = app => {
  const message_controller = require("../controllers/message.controller.js");
  var router = require("express").Router();

  // Creates an entry in the messages table
  router.post("/", message_controller.create);

  // Retrieves an entry from the messages table by id
  router.get("/:id", message_controller.findOne);

  // Retrieves entries from the messages table by search criteria
  router.get("/", message_controller.findAll);

  // Updates an entry in the messages table by id
  router.put("/:id", message_controller.update);

  // Deletes an entry in the messages table by id
  router.delete("/:id", message_controller.delete);

  app.use("/messages", router);
};

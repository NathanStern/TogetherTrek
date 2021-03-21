module.exports = app => {
  const message_board_controller =
  require("../controllers/message_board.controller.js");
  var router = require("express").Router();

  // Creates an entry in the message_boards table
  router.post("/", message_board_controller.create);

  // Retrieves an entry from the message_boards table by id
  router.get("/:id", message_board_controller.findOne);

  // Retrieves entries from the message_boards table by user id
  router.get("/summary/:id", message_board_controller.findAllId);

  // Retrieves entries from the message_boards table by user id encoded in JWT
  router.get("/", message_board_controller.findAll);

  // Updates an entry in the message_boards table by id
  router.put("/:id", message_board_controller.update);

  // Deletes an entry in the message_boards table by id
  router.delete("/:id", message_board_controller.delete);

  app.use("/message_boards", router);
};

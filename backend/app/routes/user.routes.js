module.exports = app => {
  const user_controller = require("../controllers/user.controller.js");
  var router = require("express").Router();

  // Creates an entry in the users table
  router.post("/", user_controller.create);

  // Retrieves an entry from the users table by id
  router.get("/:id", user_controller.findOne);

  // Retrieves entries from the users table by search criteria
  router.get("/", user_controller.findAll);

  // Updates an entry in the users table by id
  router.put("/:id", user_controller.update);

  // Deletes an entry in the users table by id
  router.delete("/:id", user_controller.delete);

  app.use("/users", router);
};

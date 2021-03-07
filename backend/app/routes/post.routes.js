module.exports = app => {
  const post_controller = require("../controllers/post.controller.js");
  var router = require("express").Router();

  // Creates an entry in the posts table
  router.post("/", post_controller.create);

  // Retrieves an entry from the posts table by id
  router.get("/:id", post_controller.findOne);

  // Retrieves entries from the posts table by search criteria
  router.get("/", post_controller.findAll);

  // Updates an entry in the posts table by id
  router.put("/:id", post_controller.update);

  // Deletes an entry in the posts table by id
  router.delete("/:id", post_controller.delete);

  app.use("/posts", router);
};

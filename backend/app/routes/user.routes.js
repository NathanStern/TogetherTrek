module.exports = app => {
  const user_controller = require("../controllers/user.controller.js");
  var router = require("express").Router();

  // Creates an entry in the users table
  router.post("/", user_controller.create);

  // Logs the User in
  router.post("/login", user_controller.login);

  // Retrieves an entry from the users table by id
  router.get("/:id", user_controller.findOne);

  // Retrieves entries from the users table by search criteria
  router.get("/", user_controller.findAll);

  // Updates an entry in the users table by id
  router.put("/:id", user_controller.update);

  // Deletes an entry in the users table by id
  router.delete("/:id", user_controller.delete);

  // Sets a users profile pic to a new image
  router.put("/profile-pic/:id", user_controller.setProfilePic);

  // Gets a users profile pic
  router.get("/profile-pic/:id", user_controller.getProfilePic);

  // Make a friend request
  router.put("/request-friend/:id", user_controller.makeFriendRequest);

  // Accept a friend request
  router.put("/accept-friend/:id", user_controller.acceptFriendRequest);

  // Decline a friend request
  router.put("/decline-friend/:id", user_controller.declineFriendRequest);

  app.use("/users", router);
};

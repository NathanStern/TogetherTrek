module.exports = app => {
    const expense_controller =
    require("../controllers/expense.controller.js");
    var router = require("express").Router();
  
    // Creates an entry in the expenses table
    router.post("/", expense_controller.create);
  
    // Retrieves an entry from the expenses table by id
    router.get("/:id", expense_controller.findOne);
  
    // Retrieves entries from the expenses table by search criteria
    router.get("/", expense_controller.findAll);
  
    // Updates an entry in the expenses table by id
    router.put("/:id", expense_controller.update);
  
    // Deletes an entry in the expenses table by id
    router.delete("/:id", expense_controller.delete);
  
    app.use("/expenses", router);
  };
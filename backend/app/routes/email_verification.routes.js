module.exports = app => {
    const email_verification_controller = require("../controllers/email_verification.controller.js");
    var router = require("express").Router();

    // Verifies the user's email address with a given verification id
    router.get("/:id", email_verification_controller.verify);

    app.use("/email_verification", router);
}
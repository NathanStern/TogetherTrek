module.exports = app => {
    const email_verification_controller = require("../controllers/email_verification.controller.js");
    var router = require("express").Router();

    // Verifies the user's email address with a given verification id
    router.get("/:id", email_verification_controller.verify);

    // Route to show the user a screen that tells them they need specify a verification id
    router.get("/", (req, res) => {
        res.send({ message: "A verification id needs to be specified" });
        return;
    });

    app.use("/email_verification", router);
}
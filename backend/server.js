// Main app file
const config = require("./app/config/config.js");
const cors = require("cors");
const express = require("express");
const fileUpload = require('express-fileupload');

const app = express();

// Allow file uploading
app.use(fileUpload({
    createParentPath: true
}));

// Enable cross origin resource sharing
app.use(cors());

// Specify request body should be parsed as json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
const db = require("./app/models/index.js");
db.mongoose
  .connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// index route
app.get("/", (req, res) => {
  res.json({message: "Welcome to TogetherTrek."});
});

require("./app/routes/message_board.routes.js")(app);
require("./app/routes/message.routes.js")(app);
require("./app/routes/post.routes.js")(app);
require("./app/routes/trip_photo.routes.js")(app);
require("./app/routes/trip.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/expense.routes.js")(app);
require("./app/routes/email_verification.routes.js")(app);

// set port, listen for requests
const PORT = config.app.port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

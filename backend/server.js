// Main app file
const config = require("./app/config/config.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: `http://localhost:${config.app.port}`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

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

// set port, listen for requests
const PORT = config.app.port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

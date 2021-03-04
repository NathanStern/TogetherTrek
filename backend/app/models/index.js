const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.message_boards = require("./message_board.model.js")(mongoose);
db.messages = require("./message.model.js")(mongoose);
db.posts = require("./post.model.js")(mongoose);
db.trip_photos = require("./trip_photo.model.js")(mongoose);
db.trips = require("./trip.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);

module.exports = db;

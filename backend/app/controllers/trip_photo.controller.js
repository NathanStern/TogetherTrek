const path = require('path');
const db = require("../models/index.js");
const Trip_Photo = db.trip_photos;
const User = db.users;
const Trip = db.trips;

const s3_handler = require("../utils/s3_handler.js");

// Creates an entry in the trip_photos table
exports.create = (req, res) => {
  // Validate all expected fields were passed
  if (!req.body.author_id) {
    res.status(400).send({ message: "author_id can not be empty." });
    return;
  }
  if (!req.body.trip_id) {
    res.status(400).send({ message: "trip_id can not be empty." });
    return;
  }
  if (!req.files.file) {
    res.status(400).send({ message: "file can not be empty." });
    return;
  }

  // Validate reference keys exist
  const user = User.findById(req.body.author_id);
  if (!user) {
    res.status(404).send({
      message: `User with id=${req.body.author_id} not found.`
    });
    return;
  }
  const trip = Trip.findById(req.body.trip_id);
  if (!trip) {
    res.status(404).send({
      message: `Trip with id=${req.body.author_id} not found.`
    });
    return;
  }

  // Validate file is an image
  const file = req.files.file;
  if (!file.mimetype.startsWith('image')) {
    res.status(400).send({ message: "file must be type image." });
    return;
  }

  // Create a trip_photo object
  const trip_photo = new Trip_Photo({
    author_id: req.body.author_id,
    post_date: Date.now(),
    trip_id: req.body.trip_id
  });

  // Save the trip_photo to the database
  trip_photo
  .save(trip_photo)
  .then(data => {
    const trip_photo_id = data.id
    file.name = `${trip_photo_id}${path.parse(file.name).ext}`

    // Update the trip_photo filename
    trip_photo
    .update({filename: file.name})
    .then(data => {
      res.send(trip_photo_id);
    })
    .catch(err => {
      trip_photo.delete();
      res.status(500).send({
        message: err.message || "Failed to update Trip_Photo."
      });
      return;
    });

    // Upload the file to S3
    try {
      s3_handler.upload(file);
    }
    catch (err) {
      trip_photo.delete();
      res.status(500).send({
        message: err.message || "Failed to upload image."
      });
      return;
    }
  })
  .catch(err => {
    if (trip_photo_id) {
      trip_photo.delete();
    }
    res.status(500).send({
      message: err.message || "Failed to create Trip_Photo."
    });
    return;
  });
};

// Retrieves an entry from the trip_photos table by id
exports.findOne = (req, res) => {

}

// Retrieves entries from the trip_photos table by search criteria
exports.findAll = (req, res) => {

}

// Updates an entry in the trip_photos table by id
exports.update = (req, res) => {

}

// Deletes an entry in the trip_photos table by id
exports.delete = (req, res) => {

}

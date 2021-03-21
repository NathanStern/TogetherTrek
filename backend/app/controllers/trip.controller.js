const db = require("../models/index.js");


// Creates an entry in the trips table
exports.create = (req, res) => {

}

// Retrieves an entry from the trips table by id
exports.findOne = (req, res) => {

}

// Retrieves entries from the trips table by search criteria
exports.findAll = (req, res) => {

}

// Updates an entry in the trips table by id
exports.update = (req, res) => {

}

// Deletes an entry in the trips table by id
exports.delete = (req, res) => {

}

// Make a request to join a trip
exports.request_to_join = (req, res) => {
  const trip_id = req.params.id;

  // Validate expected fields are present
  if (!req.body.requesting_id) {
      res.status(400).send({ message: 'requesting_id can not be empty.' })
      return;
  }

  const requesting_id = req.body.requesting_id;

  Trip.findById(trip_id)
  .then(trip => {
    console.log("trip");
    console.log(trip);
      trip.join_requests.push(requesting_id);
      trip.save()
      .then(data => {
          res.send({
              message: "success"
          });
          return;
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Could not update join_requests array."
          });
      });
  })
  .catch(err => {
      res.status(500).send({
          message: err.message || "Could not retrieve trip."
      });
  });
}

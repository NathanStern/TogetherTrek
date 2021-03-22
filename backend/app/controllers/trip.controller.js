const db = require("../models/index.js");
const array_helper = require('../utils/array_helper.js');

const Trip = db.trips;
const User = db.users;


// Creates an entry in the trips table
exports.create = (req, res) => {
 // Validate all expected fields were passed
 if (!req.body) {
    res.status(400).send({ message: "no body." });
    return;
  }
  if (!req.body.destination) {
    res.status(400).send({ message: "destination can not be empty." });
    return;
  }
  if (!req.body.start_date) {
    res.status(400).send({ message: "start date can not be empty." });
    return;
  }
  if (!req.body.end_date) {
    res.status(400).send({ message: "end date can not be empty." });
    return;
  }
  if (!req.body.creator_id) {
    res.status(400).send({ message: "creator id can not be empty." });
    return;
  }
  if (!req.body.participant_ids) {
    res.status(400).send({ message: "participants can not be empty." });
    return;
  }

  const trip = new Trip({
    destination: req.body.destination,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    creator_id: req.body.creator_id,
    participant_ids: req.body.participant_ids
  });

  trip
  .save(trip)
  .then(data => {
    res.send(data.id);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Trip."
    });
  });
};

// Retrieves an entry from the trips table by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Trip.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: `Could not find Trip with id=${id}.` });
        }
        else {
          res.send(data);
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: `Error retrieving Trip with id=${id}.` });
    });
};

// Retrieves entries from the trips table by search criteria
exports.findAll = (req, res) => {
    // Format the requirements the way mongoose expects
    let requirements = req.query;
    let condition = {};
    Object.keys(requirements).forEach(function(key) {
    condition[key] = { $regex: new RegExp(requirements[key]), $options: "i" }
    })

    // Retrieve records that match the requirements
    Trip.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving trips."
        });
    });
};

// Updates an entry in the trips table by id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Cannot update Trip with empty data"
        })
        }

        const id = req.params.id;

        Trip.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
            res.status(404).send({message: `Could not find Trip with id=${id}.`});
            }
            else {
            res.send({message: "Trip was updated successfully!"});
            }
        })
        .catch(err => {
            res
            .status(500)
            .send({message: `Error retrieving Trip with id=${id}.`});
        });
}

// Deletes an entry in the trips table by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Trip.findByIdAndRemove(id, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Trip with id=${id}. Maybe Trip was not found.`
      });
    } else {
      res.send({
        message: "Trip was deleted successfully."
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Could not delete Trip with id=${id}.`
    });
  });
}

// Make a request to join a trip
exports.makeJoinRequest = (req, res) => {
  const trip_id = req.params.id;

  // Validate expected fields are present
  if (!req.body.requesting_user_id) {
      res.status(400).send({ message: 'requesting_user_id can not be empty.' })
      return;
  }
  const requesting_user_id = req.body.requesting_user_id;

  Trip.findById(trip_id)
  .then(trip => {
      trip.join_requests.push(requesting_user_id);
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

// Accept a request to join a trip
exports.acceptJoinRequest = (req, res) => {
  const trip_id = req.params.id;

  // Validate expected fields are present
  if (!req.body.requesting_user_id) {
      res.status(400).send({ message: 'requesting_user_id can not be empty.' })
      return;
  }

  const requesting_user_id = req.body.requesting_user_id;

  Trip.findById(trip_id)
  .then(trip => {
    User.findById(requesting_user_id)
    .then(async requesting_user => {
      // Move the requesting_user_id from the current trips's join_requests list
      // to the trip's participant_ids list
      trip.join_requests = array_helper.removeValueFromArray(
        requesting_user_id, trip.join_requests
      );
      trip.participant_ids.push(requesting_user_id);
      await trip.save()
      .catch(err => {
          res.status(500).send({
              message: err.message || "Could not update trip."
          });
          return;
      });

      // Add the trip_id to the requesting user's trip_ids list
      requesting_user.trip_ids.push(trip_id);
      requesting_user.save()
      .then(data => {
        res.send({ message: "success" });
        return;
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Could not update requesting user."
          });
          return;
      });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not retrieve requesting user."
        });
    });
  })
  .catch(err => {
      res.status(500).send({
          message: err.message || "Could not retrieve trip."
      });
  });
}

// Decline a request to join a trip
exports.declineJoinRequest = (req, res) => {
	const trip_id = req.params.id;

	if (!req.body.requesting_user_id) {
			res.status(400).send({ message: 'requesting_user_id can not be empty.' })
			return
	}
	const requesting_user_id = req.body.requesting_user_id;

	Trip.findById(trip_id)
	.then(trip => {
		// Remove the requesting_user_id from the trip's join_requests list
		trip.join_requests = array_helper.removeValueFromArray(
			requesting_user_id, trip.join_requests
		);
		trip.save()
		.then(data => {
			res.send({ message: "success" });
			return;
		})
		.catch(err => {
				res.status(500).send({
						message: err.message || "Could not update trip."
				});
				return;
		});
	})
	.catch(err => {
		res.status(500).send({
				message: err.message || "Could not retrieve trip."
		});
		return;
	});
}

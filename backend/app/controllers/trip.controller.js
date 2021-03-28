const db = require("../models/index.js");
const array_helper = require('../utils/array_helper.js')

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

exports.removeUser = (req, res) => {
  const trip_id = req.params.id;

  // Validate expected fields are present
  if (!req.body.user_id) {
      res.status(400).send({ message: 'user_id can not be empty.' })
      return;
  }
  const user_id_to_remove = req.body.user_id;

  // Get the decoded authorization token
  try {
    const decoded_token = token_helper.getDecodedToken(req.headers);
  } catch (err) {
    res.status(err[0]).send({ meesage: err[1] });
    return;
  }

  const current_user_id = decoded_token["id"];

  Trip.findById(trip_id)
  .then(trip => {
    User.findById(user_id_to_remove)
    .then(user => {
      if (user_id_to_remove == current_user_id) {
        // If the current user is the one being removed, they are leaving a trip
        if (current_user_id == trip.creator_id) {
          if (trip.participant_ids.length == 1) {
            // If the current user is leaving their own trip and they are the
            // last user in the trip, delete the trip
            await trip.delete()
            .catch(err => {
              res.status(500).send({
                message: err.message || "Could not delete trip."
              })
            });

            // Remove the trip_id from the user's trip_ids
            user.trip_ids = array_helper.removeValueFromArray(
              trip_id, user.trip_ids
            );
            user.save()
            .then(data => {
              res.send({ message: "success" });
              return;
            })
            .catch(err => {
              res.status(500).send({
                message: err.message || "Could not update user."
              });
              return;
            });
          } else {
            // If the current user is leaving their own trip and there are other
            // users in the trip, make one of them the new trip owner
            trip.participant_ids = array_helper.removeValueFromArray(
              user_id_to_remove, trip.participant_ids
            );
            trip.creator_id = participant_ids[0];
            await trip.save()
            .catch(err => {
              res.status(500).send({
                message: err.message || "Could not update trip."
              });
              return;
            });
          }

          // Remove the trip_id from the user's trip_ids
          user.trip_ids = array_helper.removeValueFromArray(
            trip_id, user.trip_ids
          );
          user.save()
          .then(data => {
            res.send({ message: "success" });
            return;
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || "Could not update user."
            });
            return;
          });
        } else {
          // If the current user is leaving somebody else's trip, remove the
          // user_id_to_remove from the trip's participant_ids
          trip.participant_ids = array_helper.removeValueFromArray(
            user_id_to_remove, trip.participant_ids
          );
          await trip.save()
          .catch(err => {
            res.status(500).send({
              message: err.message || "Could not update trip."
            });
            return;
          });

          // Remove the trip_id from the user's trip_ids
          user.trip_ids = array_helper.removeValueFromArray(
            trip_id, user.trip_ids
          );
          user.save()
          .then(data => {
            res.send({ message: "success" });
            return;
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || "Could not update user."
            });
            return;
          });
        }
      } else {
        // If the current user is not the one being removed, then they are being
        // removed by another user

        // TODO: implement the following logic
        // if the current_user_id matches the creator_id of the trip
        // then the current user owns the trip and therefore has permission to
        // remove other users from the trip so remove the user_id_to_remove from
        // the trip's participant_ids then remove the trip_id from the
        // user's list of trip_ids

        // if the current_user_id does not match the creator_id of the trip
        // then the current user does not own the trip and therefore does not have
        // permission to remove other users from it so return an error
        if (current_user_id == trip.creator_id) {
          if (trip.participant_ids.length == 1) {
            // If the current user is leaving their own trip and they are the
            // last user in the trip, delete the trip
            await trip.delete()
            .catch(err => {
              res.status(500).send({
                message: err.message || "Could not delete trip."
              })
            });

            // Remove the trip_id from the user's trip_ids
            user.trip_ids = array_helper.removeValueFromArray(
              trip_id, user.trip_ids
            );
            user.save()
            .then(data => {
              res.send({ message: "success" });
              return;
            })
            .catch(err => {
              res.status(500).send({
                message: err.message || "Could not update user."
              });
              return;
            });
          } else {
            // If the current user is leaving their own trip and there are other
            // users in the trip, make one of them the new trip owner
            trip.participant_ids = array_helper.removeValueFromArray(
              user_id_to_remove, trip.participant_ids
            );
            trip.creator_id = participant_ids[0];
            await trip.save()
            .catch(err => {
              res.status(500).send({
                message: err.message || "Could not update trip."
              });
              return;
            });
          }

          // Remove the trip_id from the user's trip_ids
          user.trip_ids = array_helper.removeValueFromArray(
            trip_id, user.trip_ids
          );
          user.save()
          .then(data => {
            res.send({ message: "success" });
            return;
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || "Could not update user."
            });
            return;
          });
        } else {
          // If the current user is leaving somebody else's trip, remove the
          // user_id_to_remove from the trip's participant_ids
          res.status(500).send({
              message: err.message || "Could not update trip because current user doesn't have permission."
          });
          return;
        }
      }
    })
    .catch(err => {
      res.status(500).send({
          message: err.message || "Could not retrieve user."
      });
    });
  })
  .catch(err => {
    res.status(500).send({
        message: err.message || "Could not retrieve trip."
    });
  });
}

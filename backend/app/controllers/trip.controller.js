const db = require("../models/index.js");
const array_helper = require('../utils/array_helper.js')
const token_helper = require('../utils/token_helper.js')

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
  let budget1 = 1000000000000000;
  if (req.body.budget) {
    budget1 = req.body.budget;
  }

  const trip = new Trip({
    destination: req.body.destination,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    creator_id: req.body.creator_id,
    participant_ids: req.body.participant_ids,
    budget: budget1,
  });

  trip
  .save(trip)
  .then(async (data) => {
    var user = await User.findById(req.body.creator_id)
    if (!user) {
        res.status(500).send({ message: "Could not update user." })
    }
    user.trip_ids.push(data.id)
    User.findByIdAndUpdate(req.body.author_id, user, { useFindAndModify: false })
      .then((data) => {
          if (!data) {
              res.status(404).send({ message: `Could not find User with id=${id}.` })
          } else {
              res.send({ message: 'User was updated successfully!' })
          }
      })
      .catch((err) => {
          res.status(500).send({ message: `Error retrieving User with id=${id}.` })
      })
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

exports.search = (req, res) => {
  let budget1 = 10000000000000000000000000000000;
  const location = req.query.location;
  console.log(location);
  console.log(req.query.budget);
  if (req.query.budget) {
    budget1 = req.query.budget;
  }
  else {
    if (req.query.isCountry) {
      Trip.find({"destination.country": {$in: [`${location}`]}})
      .then(data => {
        if (!data) {
          res.status(404).send({message: `Could not find a trip.`});
          console.log("404 error");
        }
        else {
          res.send(data);
          console.log("Good answer");
        }
      })
      .catch(err => {
        res.status(500).send({message: `Could not find a trip with that city name.`})
        console.log("500 error");
      })
    }
    else {
      Trip.find({"destination.city": {$in: [`${location}`]}})
      .then(data => {
        if (!data) {
          res.status(404).send({message: `Could not find a trip.`});
          console.log("404 error");
        }
        else {
          res.send(data);
          console.log("Good answer");
        }
      })
      .catch(err => {
        res.status(500).send({message: `Could not find a trip with that city name.`})
        console.log("500 error");
      })
    }
    return;
  }
  /*if (!req.body.location) {
    res.status(400).send({ message: 'location cannot be empty.' });
    return;
  }*/
  if (req.query.isCountry) {
    Trip.find({budget: { $lte: budget1 }, "destination.country": {$in: [`${location}`]}})
    .then(data => {
      if (!data) {
        res.status(404).send({message: `Could not find a trip.`});
      }
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({message: `Could not find a trip within budget.`})
    })
  }
  else {
    Trip.find({budget: { $lte: budget1 }, "destination.city": {$in: [`${location}`]}})
    .then(data => {
      if (!data) {
        res.status(404).send({message: `Could not find a trip.`});
      }
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({message: `Could not find a trip within budget.`})
    })
  }
}

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

exports.removeUser = (req, res) => {
  var fail = 0;
  const trip_id = req.params.id;

  // Validate expected fields are present
  if (!req.body.user_id) {
      res.status(400).send({ message: 'user_id can not be empty.' })
      return;
  }
  const user_id_to_remove = req.body.user_id;

  // Get the decoded authorization token
  let decoded_token;
  try {
    decoded_token = token_helper.getDecodedToken(req.headers);
  } catch (err) {
    res.status(err[0]).send({ meesage: err[1] });
    return;
  }

  const current_user_id = decoded_token["id"];

  Trip.findById(trip_id)
  .then(trip => {
    User.findById(user_id_to_remove)
    .then(async user => {
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
              });
              fail = 1;
            });
            if (fail)
              return;

            // Remove the trip_id from the user's trip_ids
            user.trip_ids = array_helper.removeValueFromArray(
              trip_id, user.trip_ids
            );
            user.save()
            .then(data => {
              res.send({ message: "success" });
            })
            .catch(err => {
              res.status(500).send({
                message: err.message || "Could not update user."
              });
            });
            return;
          } else {
            // If the current user is leaving their own trip and there are other
            // users in the trip, make one of them the new trip owner
            trip.creator_id = trip.participant_ids[0];
          }
        }

        // Remove the user_id from the trip's participant_ids
        trip.participant_ids = array_helper.removeValueFromArray(
          user_id_to_remove, trip.participant_ids
        );
        await trip.save()
        .catch(err => {
          res.status(500).send({
            message: err.message || "Could not update trip."
          });
          fail = 1;
        });
        if (fail)
          return;

        // Remove the trip_id from the user's trip_ids
        user.trip_ids = array_helper.removeValueFromArray(
          trip_id, user.trip_ids
        );
        user.save()
        .then(data => {
          res.send({ message: "success" });
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Could not update user."
          });
          fail = 1
        });
        if (fail)
          return;
      } else {
        // If the current user is not the one being removed, they must be
        // removed by the trip owner
        if (current_user_id == trip.creator_id) {
          // If the current user is the trip owner, remove the user
          trip.participant_ids = array_helper.removeValueFromArray(
            user_id_to_remove, trip.participant_ids
          );
          await trip.save()
          .catch(err => {
            res.status(500).send({
              message: err.message || "Could not update trip."
            });
            fail = 1;
          });
          if (fail)
            return;

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
          // If the user making the request is not the trip owner, return an error
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

exports.removeUserUsername = (req, res) => {
  var fail = 0;
  const trip_id = req.params.id;

  // Validate expected fields are present
  if (!req.body.username) {
      res.status(400).send({ message: 'user_id can not be empty.' })
      return;
  }
  const username_to_remove = req.body.username;
  let condition = {};
  Object.keys(username_to_remove).forEach(function(key) {
    condition[key] = { $regex: new RegExp(username_to_remove[key]), $options: "i" }
  });
  let user_id_to_remove;
  User.find(condition)
  .then(data => {
    user_id_to_remove = data[0]._id;
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving the user."
    })
  })
  // Get the decoded authorization token
  let decoded_token;
  try {
    decoded_token = token_helper.getDecodedToken(req.headers);
  } catch (err) {
    res.status(err[0]).send({ meesage: err[1] });
    return;
  }

  const current_user_id = decoded_token["id"];

  Trip.findById(trip_id)
  .then(trip => {
    User.findById(user_id_to_remove)
    .then(async user => {
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
              });
              fail = 1;
            });
            if (fail)
              return;

            // Remove the trip_id from the user's trip_ids
            user.trip_ids = array_helper.removeValueFromArray(
              trip_id, user.trip_ids
            );
            user.save()
            .then(data => {
              res.send({ message: "success" });
            })
            .catch(err => {
              res.status(500).send({
                message: err.message || "Could not update user."
              });
            });
            return;
          } else {
            // If the current user is leaving their own trip and there are other
            // users in the trip, make one of them the new trip owner
            trip.creator_id = trip.participant_ids[0];
          }
        }

        // Remove the user_id from the trip's participant_ids
        trip.participant_ids = array_helper.removeValueFromArray(
          user_id_to_remove, trip.participant_ids
        );
        await trip.save()
        .catch(err => {
          res.status(500).send({
            message: err.message || "Could not update trip."
          });
          fail = 1;
        });
        if (fail)
          return;

        // Remove the trip_id from the user's trip_ids
        user.trip_ids = array_helper.removeValueFromArray(
          trip_id, user.trip_ids
        );
        user.save()
        .then(data => {
          res.send({ message: "success" });
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Could not update user."
          });
          fail = 1
        });
        if (fail)
          return;
      } else {
        // If the current user is not the one being removed, they must be
        // removed by the trip owner
        if (current_user_id == trip.creator_id) {
          // If the current user is the trip owner, remove the user
          trip.participant_ids = array_helper.removeValueFromArray(
            user_id_to_remove, trip.participant_ids
          );
          await trip.save()
          .catch(err => {
            res.status(500).send({
              message: err.message || "Could not update trip."
            });
            fail = 1;
          });
          if (fail)
            return;

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
          // If the user making the request is not the trip owner, return an error
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
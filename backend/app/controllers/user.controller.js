const path = require('path');
const jwt = require('jsonwebtoken')

const config = require('../config/config.js');
const db = require('../models/index.js');
const s3_handler = require('../utils/s3_handler.js');
const array_helper = require('../utils/array_helper.js');

const User = db.users;


// Creates an entry in the users table
exports.create = (req, res) => {
	// Validate all expected fields were passed
	if (!req.body.username) {
		res.status(400).send({ message: 'username can not be empty.' })
		return
	}
	if (!req.body.password) {
		res.status(400).send({ message: 'password can not be empty.' })
		return
	}
	if (!req.body.email) {
		res.status(400).send({ message: 'email can not be empty.' })
		return
	}
	if (!req.body.birthdate) {
		res.status(400).send({ message: 'birthdate can not be empty.' })
		return
	}
	if (!req.body.gender) {
		res.status(400).send({ message: 'gender can not be empty.' })
		return
	}
	if (!req.body.first_name) {
		res.status(400).send({ message: 'first_name can not be empty.' })
		return
	}
	if (!req.body.last_name) {
		res.status(400).send({ message: 'last_name can not be empty.' })
		return
	}

	const user = new User({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		birthdate: req.body.birthdate,
		gender: req.body.gender,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
	})

	user
		.save(user)
		.then((data) => {
			res.send(data.id)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the User.',
			})
		})
}

// Logs the User in
exports.login = (req, res) => {
	User.find({ username: req.body.username })
		.exec()
		.then((user) => {
			if (user.length < 1) {
				return res.status(401).json({
					// We should definitely change this later so there is no indication as to what the user did to screw up the login.
					message: 'Username does not exist.',
				})
			}
			// this will change once we add encryption
			if (req.body.password == user[0].password) {
				const token = jwt.sign(
					{
						username: user[0].username,
						id: user[0].id,
					},
					config.app.JWT_KEY,
					{
						expiresIn: '2h',
					}
				)
				return res.status(200).json({
					message: 'Authentication successful!',
					token: token,
				})
			} else {
				return res.status(401).json({
					// We should definitely change this later so there is no indication as to what the user did to screw up the login.
					message: 'Incorrect Password.',
				})
			}
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				error: err,
			})
		})
}

// Retrieves an entry from the users table by id
exports.findOne = (req, res) => {
	const id = req.params.id

	User.findById(id)
		.then((data) => {
			if (!data) {
				res.status(404).send({ message: `Could not find User with id=${id}.` })
			} else {
				// TODO: We should remove the password field and maybe other fields from
				// the response
				res.send(data)
			}
		})
		.catch((err) => {
			res.status(500).send({ message: `Error retrieving User with id=${id}.` })
		})
}

// Retrieves entries from the users table by search criteria
exports.findAll = (req, res) => {
	// Format the requirements the way mongoose expects
	let requirements = req.query
	let condition = {}
	Object.keys(requirements).forEach(function (key) {
		condition[key] = { $regex: new RegExp(requirements[key]), $options: 'i' }
	})

	// Retrieve records that match the requirements
	User.find(condition)
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving users.',
			})
		})
}

// Updates a password users table by id
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: 'Cannot update User with empty data',
		})
	}

	const id = req.params.id

	User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
}

// Deletes an entry in the users table by id
exports.delete = (req, res) => {
	const id = req.params.id

	User.findByIdAndRemove(id, { useFindAndModify: false })
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot delete User with id=${id}. Maybe User was not found.`,
				})
			} else {
				res.send({
					message: 'User was deleted successfully.',
				})
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Could not delete User with id=${id}.`,
			})
		})
}

// Sets a users profile pic to a new image
exports.setProfilePic = (req, res) => {
	const user_id = req.params.id

	// Validate all expected fields were passed
	if (!req.files || !req.files.file) {
		res.status(400).send({ message: 'file can not be empty.' })
		return
	}
	const file = req.files.file

	// Validate file is an image
	if (!file.mimetype.startsWith('image')) {
		res.status(400).send({ message: 'file must be type image.' })
		return
	}

	// Get the user entry from the database
	const user = User.findById(user_id)
		.then((user) => {
			if (!user) {
				res.status(404).send({
					message: `Could not find User with id=${user_id}.`,
				})
			} else {
				// Rename the file so that it is unique in S3
				file.name = `${user_id}${path.parse(file.name).ext}`
				let new_pic_filename = file.name

				// Attempt to upload the new profile pic to S3
				s3_handler.upload(file).catch((err) => {
					res.status(500).send({
						message: err.message || 'Could not upload new profile pic.',
					})
					return
				})

				// Update the user profile_pic filename and upload_date
				user.profile_pic.filename = new_pic_filename
				user.profile_pic.upload_date = Date.now()

				user
					.save()
					.then((data) => {
						res.send({
							message: 'success',
						})
						return
					})
					.catch((err) => {
						res.status(500).send({
							message:
								err.message ||
								'Some error occurred while updating profile pic.',
						})
					})
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Some error occurred while retrieving User with id=${user_id}.`,
			})
		})
}

// Gets a users profile pic
exports.getProfilePic = (req, res) => {
	const user_id = req.params.id

	// Get the user entry from the database
	User.findById(user_id)
		.then((user) => {
			if (!user) {
				res.status(404).send({
					message: `Could not find User with id=${user_id}.`,
				})
				return
			} else {
				// Get the profile pic and return it
				s3_handler
					.findOne(user.profile_pic.filename)
					.then((profile_pic) => {
						if (!profile_pic) {
							res.status(404).send({
								message: `Could not find profile pic.`,
							})
							return
						}
						res.send(profile_pic)
						return
					})
					.catch((err) => {
						res.status(500).send({
							message: err.message || 'Could not get profile pic.',
						})
						return
					})
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error retrieving User with id=${user_id}.`,
			})
		})
}

// Sets a users profile pic to a new image
exports.setProfilePic = (req, res) => {
  const user_id = req.params.id;

  // Validate all expected fields were passed
  if (!req.files || !req.files.file) {
    res.status(400).send({ message: "file can not be empty." });
    return;
  }
  const file = req.files.file;

  // Validate file is an image
  if (!file.mimetype.startsWith('image')) {
    res.status(400).send({ message: "file must be type image." });
    return;
  }

  // Get the user entry from the database
  const user = User.findById(user_id)
	.then(user => {
    if (!user) {
      res.status(404).send({
        message: `Could not find User with id=${user_id}.`
      });
    } else {
			// Rename the file so that it is unique in S3
		  file.name = `${user_id}${path.parse(file.name).ext}`;
		  let new_pic_filename = file.name;

		  // Attempt to upload the new profile pic to S3
			s3_handler.upload(file)
			.then(data => {})
			.catch(err => {
				res.status(500).send({
					message: err.message || "Could not upload new profile pic."
				});
				return;
			});

			// Update the user profile_pic filename and upload_date
		  user.profile_pic.filename = new_pic_filename;
		  user.profile_pic.upload_date = Date.now();

		  user.save()
		  .then(data => {
		    res.send({
		      message: "success"
		    });
				return;
		  })
		  .catch(err => {
		    res.status(500).send({
		      message:
		        err.message || "Some error occurred while updating profile pic."
		    });
		  });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Some error occurred while retrieving User with id=${user_id}.`
    });
  });
}

// Gets a users profile pic
exports.getProfilePic = (req, res) => {
	const user_id = req.params.id

	// Get the user entry from the database
	User.findById(user_id)
		.then((user) => {
			if (!user) {
				res.status(404).send({
					message: `Could not find User with id=${user_id}.`,
				})
				return
			} else {
				// Get the profile pic and return it
				filename = user.profile_pic.filename;
				s3_handler
					.findOne(filename)
					.then(image => {
						if (!image) {
							res.status(404).send({
								message: `Could not find profile pic.`,
							})
							return;
						}
						if (filename.includes("jpeg") || filename.includes("jpg"))
							res.writeHead(200, {'Content-Type': 'image/jpeg'});
						else
							res.writeHead(200, {'Content-Type': 'image/png'});
						res.write(image.Body, 'binary');
						res.end(null, 'binary');
						return;
					})
					.catch((err) => {
						res.status(500).send({
							message: err.message || 'Could not get profile pic.',
						})
						return;
					})
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error retrieving User with id=${user_id}.`,
			})
		})
}


// Make a friend request
exports.makeFriendRequest = (req, res) => {
    const user_id = req.params.id;
    if (!req.body.requesting_user_id) {
        res.status(400).send({ message: 'requesting_user_id can not be empty.' })
        return
    }
		const requesting_user_id = req.body.requesting_user_id;

    User.findById(user_id)
    .then(user => {
        user.friend_requests.push(requesting_user_id);
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
    })
    .catch(err => {
		    res.status(500).send({
		        message: err.message || "Could not retrieve user."
		    });
				return;
    });
}

// Accept a friend request
exports.acceptFriendRequest = (req, res) => {
	const current_user_id = req.params.id;
	if (!req.body.requesting_user_id) {
			res.status(400).send({ message: 'requesting_user_id can not be empty.' })
			return
	}
	const requesting_user_id = req.body.requesting_user_id;

	User.findById(current_user_id)
	.then(current_user => {
		User.findById(requesting_user_id)
		.then(async requesting_user => {
			// Move the requesting_user_id from the current user's friend_requests
			// list to their friend_ids list
			current_user.friend_requests = array_helper.removeValueFromArray(
				requesting_user_id, current_user.friend_requests
			);
			current_user.friend_ids.push(requesting_user_id);
			await current_user.save()
			.catch(err => {
					res.status(500).send({
							message: err.message || "Could not update current user."
					});
					return;
			});

			// Add the current_user_id to the friend_ids of the requesting user
			requesting_user.friend_ids.push(current_user_id);
			requesting_user.save()
			.then(data => {
				res.send({ message: "success" });
				return;
			})
			.catch(err => {
					res.status(500).send({
							message: err.message || "Could not update current user."
					});
					return;
			});
		})
		.catch(err => {
				res.status(500).send({
						message: err.message || "Could not retrieve requesting user."
				});
				return;
		});
	})
	.catch(err => {
			res.status(500).send({
					message: err.message || "Could not retrieve current user."
			});
			return;
	});
}

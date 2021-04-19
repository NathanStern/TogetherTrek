const path = require('path')
const sgMail = require('@sendgrid/mail')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const config = require('../config/config.js')
const db = require('../models/index.js')
const array_helper = require('../utils/array_helper.js');
const s3_handler = require('../utils/s3_handler.js')
const token_helper = require('../utils/token_helper.js')

const User = db.users;
const Trip = db.trips;
const Email_Verification = db.email_verification;

function createEmailBody(verificationId) {
	var html =
	`
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
  <style type="text/css">
    body {width: 600px;margin: 0 auto;}
    table {border-collapse: collapse;}
    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
    img {-ms-interpolation-mode: bicubic;}
  </style>
<![endif]-->
      <style type="text/css">
    body, p, div {
      font-family: arial,helvetica,sans-serif;
      font-size: 14px;
    }
    body {
      color: #000000;
    }
    body a {
      color: #1188E6;
      text-decoration: none;
    }
    p { margin: 0; padding: 0; }
    table.wrapper {
      width:100% !important;
      table-layout: fixed;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    img.max-width {
      max-width: 100% !important;
    }
    .column.of-2 {
      width: 50%;
    }
    .column.of-3 {
      width: 33.333%;
    }
    .column.of-4 {
      width: 25%;
    }
    ul ul ul ul  {
      list-style-type: disc !important;
    }
    ol ol {
      list-style-type: lower-roman !important;
    }
    ol ol ol {
      list-style-type: lower-latin !important;
    }
    ol ol ol ol {
      list-style-type: decimal !important;
    }
    @media screen and (max-width:480px) {
      .preheader .rightColumnContent,
      .footer .rightColumnContent {
        text-align: left !important;
      }
      .preheader .rightColumnContent div,
      .preheader .rightColumnContent span,
      .footer .rightColumnContent div,
      .footer .rightColumnContent span {
        text-align: left !important;
      }
      .preheader .rightColumnContent,
      .preheader .leftColumnContent {
        font-size: 80% !important;
        padding: 5px 0;
      }
      table.wrapper-mobile {
        width: 100% !important;
        table-layout: fixed;
      }
      img.max-width {
        height: auto !important;
        max-width: 100% !important;
      }
      a.bulletproof-button {
        display: block !important;
        width: auto !important;
        font-size: 80%;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .columns {
        width: 100% !important;
      }
      .column {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .social-icon-column {
        display: inline-block !important;
      }
    }
  </style>
      <!--user entered Head Start--><!--End Head user entered-->
    </head>
    <body>
      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
            <tr>
              <td valign="top" bgcolor="#FFFFFF" width="100%">
                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="100%">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                      <tr>
                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    <tr>
      <td role="module-content">
        <p></p>
      </td>
    </tr>
  </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="709b7abe-57c1-4290-ae1b-89e217c790d2">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/2154da8d48364d45/17e63b0d-d9d6-4dd4-814d-0d6530ffaeb2/1084x636.jpg">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="12400aed-9119-4480-a948-e91901afe877">
    <tbody>
      <tr>
        <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center">Thank you so much for joining TogetherTrek. Please click the link below to verify your email address.</div>
<div style="font-family: inherit; text-align: center"><br></div>
<div style="font-family: inherit; text-align: center"><a href="https://together-trek-testing.herokuapp.com/email_verification/${verificationId}">Verify Email Address</a></div>
<div style="font-family: inherit; text-align: center"><br></div>
<div style="font-family: inherit; text-align: center">If you can't click the link above, copy and paste the URL below into your browser.</div>
<div style="font-family: inherit; text-align: center"><br></div>
<div style="font-family: inherit; text-align: center; word-break: break-all;">https://together-trek-testing.herokuapp.com/email_verification/${verificationId}</div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="973cad25-23f8-4c44-b72f-4407c5c32bf4">
    <tbody>
      <tr>
        <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
          <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
            <tbody>
              <tr>
                <td style="padding:0px 0px 10px 0px;" bgcolor="#000000"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="2159989a-b5ab-46d5-b749-2b939d9b50db">
    <tbody>
      <tr>
        <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit">Please note that you will not be subscribed to emails from TogetherTrek. This is just a message to confirm your email address for account verification.</div><div></div></div></td>
      </tr>
    </tbody>
  </table></td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>
	`;

	return html;
}

function getLocation(coordinates) {
	return new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();
		request.open("GET", `https://api.radar.io/v1/geocode/reverse?coordinates=${coordinates[0]},${coordinates[1]}`)
		request.setRequestHeader("Authorization", config.app.RADARIO_KEY)
		request.onload = () => {
			if (request.status === 200) {
				let location = JSON.parse(request.responseText).addresses[0]
				resolve(location);
			} else {
				reject(request.status);
			}
		}
		request.send();
	})
}

function getCoordinates(city, country) {
	return new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();
		request.open("GET", `https://api.radar.io/v1/geocode/forward?query=${city}`)
		request.setRequestHeader("Authorization", config.app.RADARIO_KEY)
		request.onload = () => {
			if (request.status === 200) {
				let location = JSON.parse(request.responseText).addresses[0]
				resolve([location.latitude, location.longitude]);
			} else {
				reject(request.status);
			}
		}
		request.send();
	})
}

// Creates an entry in the users table
exports.create = async (req, res) => {
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
	if (!req.body.city) {
		res.status(400).send({ message: 'city can not be empty.' })
		return
	}
	if (!req.body.country) {
		res.status(400).send({ message: 'country can not be empty.' })
		return
	}

	// Check if the username or email are already in use
	let success = true
	let error_message = null

	await User.find({username : req.body.username})
		.exec()
		.then(data => {
			if (data.length) {
				console.log("dup user")
				error_message = 'username already exists';
				success = false
			}
		})
		.catch(err => {
			console.log("dup user e")
			error_message = 'username already exists';
			success = false
		})
	await User.find({email : req.body.email})
		.exec()
		.then(data => {
			if (data.length) {
				console.log("dup email")
				error_message = 'email already exists';
				success = false
			}
		})
		.catch(err => {
			console.log("dup email e")
			error_message = 'email already exists';
			success = false
		})

	if (!success) {
		res.status(400).send({ message: error_message });
		return;
	}

	// Convert city and country to coordinates
	let coordinates;
	try {
		coordinates = await getCoordinates(req.body.city, req.body.country);
	} catch(error) {
		res.status(400).send({ message: "Could not save location" });
		return;
	}

	const user = new User({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		birthdate: req.body.birthdate,
		gender: req.body.gender,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		coordinates: coordinates
	});

	user
		.save(user)
		.then((data) => {
			const verification = new Email_Verification({
				user_id: data.id
			});

			verification
				.save(verification)
				.then((verified) => {
					sgMail.setApiKey(config.app.TWILIO_KEY);
					const msg = {
						to: req.body.email,
						from: config.app.TWILIO_EMAIL,
						subject: "TogetherTrek: Verify your email",
						html: createEmailBody(verified.id)
					};

					sgMail
						.send(msg)
						.then(() => {
							res.send(data.id);
							return;
						})
						.catch((err) => {
							throw err;
						});
				}).catch((err) => {
					throw err;
				});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the User.',
			});
			return;
		});
}

// Logs the User in
exports.login = (req, res) => {
	if (!req.body.username) {
		res.status(400).send({ message: 'username can not be empty.' })
		return
	}
	const username = req.body.username;

	User.find({ username: username })
		.exec()
		.then(user => {
			if (user.length < 1) {
				res.status(401).send({
					// We should definitely change this later so there is no indication as to what the user did to screw up the login.
					message: 'Username does not exist.',
				});
				return;
			}
			// this will change once we add encryption
			if (req.body.password == user[0].password) {
				const token = token_helper.generateToken(username, user[0].id);
				res.status(200).send({
					message: 'Authentication successful!',
					token: token
				});
				return;
			} else {
				res.status(401).send({
					// We should definitely change this later so there is no indication as to what the user did to screw up the login.
					message: 'Incorrect Password.'
				});
				return;
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Could not retrieve user."
			});
			return;
		})
}

// Retrieves an entry from the users table by id
exports.findOne = (req, res) => {
	const id = req.params.id

	User.findById(id)
		.then(async (data) => {
			if (!data) {
				res.status(404).send({ message: `Could not find User with id=${id}.` })
			} else {
				let resp_data = data.toObject()
				if (resp_data.coordinates.length) {
					try {
						let location = await getLocation(resp_data.coordinates);
						delete resp_data.coordinates
						resp_data.city = location.city
						resp_data.country = location.country
					} catch(error) {
						res.status(400).send("Could not get location");
						return;
					}
				}
				delete resp_data.password;
				res.send(resp_data);
			}
		})
		.catch((err) => {
			console.log(err)
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
		.then(async (data) => {
			let resp_data = [];
			let i;
			for (i = 0; i < data.length; i++) {
				let user = data[i].toObject()
				if (user.coordinates.length) {
					try {
						let location = await getLocation(user.coordinates);
						delete user.coordinates
						user.city = location.city
						user.country = location.country
					} catch(error) {
						res.status(400).send("Could not get location");
						return;
					}
				}
				delete user.password;
				resp_data.push(user);
			}
			res.send(resp_data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving users.',
			})
		})
}

// Updates a password users table by id
exports.update = async (req, res) => {
	const id = req.params.id
	if (!req.body) {
		res.status(400).send({
			message: 'Cannot update User with empty data',
		});
		return;
	}

	if (req.body.city != undefined && req.body.country != undefined) {
		try {
			let coordinates = await getCoordinates(req.body.city, req.body.country);
			delete req.body.city;
			delete req.body.country;
			req.body.coordinates = coordinates;
		} catch(error) {
			res.status(400).send({ message: "Could not save location" });
			return;
		}
	}

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
	const user_id = req.params.id;

	// Validate all expected fields were passed
	if (!req.files || !req.files.file) {
		res.status(400).send({ message: 'file can not be empty.' });
		return;
	}
	const file = req.files.file;

	// Validate file is an image
	if (!file.mimetype.startsWith('image') && !file.mimetype.startsWith('application/octet-stream')) {
		res.status(400).send({ message: 'file must be type image.' });
		return;
	}

	// Get the user entry from the database
	User.findById(user_id)
	.then(async user => {
		if (!user) {
			res.status(404).send({
				message: `Could not find User with id=${user_id}.`,
			});
			return;
		} else {
			// Rename the file so that it is unique in S3
			file.name = `${user_id}${path.parse(file.name).ext}`
			let new_pic_filename = file.name;

			// Attempt to upload the new profile pic to S3
			await s3_handler.upload(file)
			.catch((err) => {
				res.status(500).send({
					message: err.message || 'Could not upload new profile pic.',
				});
				return;
			})

			// Update the user profile_pic filename and upload_date
			user.profile_pic.filename = new_pic_filename
			user.profile_pic.upload_date = Date.now()

			user.save()
			.then((data) => {
				res.send({
					message: 'success',
				});
				return;
			})
			.catch((err) => {
				res.status(500).send({
					message:
						err.message ||
						'Some error occurred while updating profile pic.',
				});
			});
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

// Block a user
exports.blockUser = (req, res) => {
	const current_user_id = req.params.id;

	if (!req.body.requesting_user_id) {
			res.status(400).send({ message: 'requesting_user_id can not be empty.' })
			return
	}
	const requesting_user_id = req.body.requesting_user_id;

	User.findById(current_user_id)
	.then(current_user => {
		current_user.blocked_ids.push(requesting_user_id);
		current_user.save()
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
				message: err.message || "Could not retrieve current user."
		});
		return;
	});
}

// Unblock a user
exports.unblockUser = (req, res) => {
	const current_user_id = req.params.id;

	if (!req.body.requesting_user_id) {
			res.status(400).send({ message: 'requesting_user_id can not be empty.' })
			return
	}
	const requesting_user_id = req.body.requesting_user_id;

	User.findById(current_user_id)
	.then(current_user => {
		current_user.blocked_ids = array_helper.removeValueFromArray(
			requesting_user_id, current_user.blocked_ids
		);
		current_user.save()
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
				message: err.message || "Could not retrieve current user."
		});
		return;
	});
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


// invites a User to a Trip
exports.inviteUser = (req, res) => {
	//console.log("entered invite user");
	const user_id = req.params.id;
    if (!req.body.inviting_user_id) {
        res.status(400).send({ message: 'inviting_user_id can not be empty.' })
        return;
    }
	if (!req.body.trip_id) {
		res.status(400).send({ message: 'trip_id cannot be empty'})
		return;
	}
	const trip_id = req.body.trip_id;
	const inviting_user_id = req.body.inviting_user_id;
    User.findById(user_id)
    .then(user => {
		//console.log("trip id: " + trip_id);
		//console.log("User id: " + user_id);
		Trip.findById(trip_id)
		.then(trip => {
			//console.log(trip.participant_ids + "sadasd");
			if (trip.participant_ids === null || !trip.participant_ids.includes(inviting_user_id)) {
				res.status(400).send({ message: 'User is not a member of the trip.'})
				console.log("error 400");
				return;
			}
			user.trip_requests.push(trip_id);
			//console.log(user.trip_requests[0]);
			user.save()
			.then(data => {
				res.send({ message: "success" });
				console.log("success 200");
				return;
			})
			.catch(err => {
				res.status(500).send({
					message: err.message || "Could not update user."
				});
				console.log("error 500           1");
				return;
			});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Could not retrieve trip."
			})
			console.log("error 500                 2");
			return;
		})
    })
    .catch(err => {
		    res.status(500).send({
		        message: err.message || "Could not retrieve user."
		    });
			console.log("error 500                      3");
				return;
    });
}

// Decline a friend request
exports.declineFriendRequest = (req, res) => {
	const current_user_id = req.params.id;

	if (!req.body.requesting_user_id) {
			res.status(400).send({ message: 'requesting_user_id can not be empty.' })
			return
	}
	const requesting_user_id = req.body.requesting_user_id;

	User.findById(current_user_id)
	.then(current_user => {
		// Remove the requesting_user_id from the current user's friend_requests
		// list
		current_user.friend_requests = array_helper.removeValueFromArray(
			requesting_user_id, current_user.friend_requests
		);
		current_user.save()
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
				message: err.message || "Could not retrieve current user."
		});
		return;
	});

}

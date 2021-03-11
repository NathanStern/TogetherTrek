const db = require("../models/index.js");
const User = db.users;

// Creates an entry in the users table
exports.create = (req, res) => {
  // Validate all expected fields were passed
  if (!req.body.username) {
    res.status(400).send({ message: "username can not be empty." });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({ message: "password can not be empty." });
    return;
  }
  if (!req.body.email) {
    res.status(400).send({ message: "email can not be empty." });
    return;
  }
  if (!req.body.birthdate) {
    res.status(400).send({ message: "birthdate can not be empty." });
    return;
  }
  if (!req.body.gender) {
    res.status(400).send({ message: "gender can not be empty." });
    return;
  }
  if (!req.body.first_name) {
    res.status(400).send({ message: "first_name can not be empty." });
    return;
  }
  if (!req.body.last_name) {
    res.status(400).send({ message: "last_name can not be empty." });
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
  });

  user
  .save(user)
  .then(data => {
    res.send(data.id);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  });
};

// Retrieves an entry from the users table by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Could not find User with id=${id}.` });
      }
      else {
        // TODO: We should remove the password field and maybe other fields from
        // the response
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving User with id=${id}.` });
    });
};

// Retrieves entries from the users table by search criteria
exports.findAll = (req, res) => {
  // Format the requirements the way mongoose expects
  let requirements = req.query;
  let condition = {};
  Object.keys(requirements).forEach(function(key) {
    condition[key] = { $regex: new RegExp(requirements[key]), $options: "i" }
  })

  // Retrieve records that match the requirements
  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Updates a password users table by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Cannot update User with empty data"
    })
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
      if (!data) {
        res.status(404).send({message: `Could not find User with id=${id}.`});
      }
      else {
        res.send({message: "User was updated successfully!"});
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({message: `Error retrieving User with id=${id}.`});
    });
}

// Deletes an entry in the users table by id
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found.`
        });
      } else {
        res.send({
          message: "User was deleted successfully."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete User with id=${id}.`
      });
    });
};

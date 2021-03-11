const db = require("../models/index.js");
const Post = db.posts;

// Creates an entry in the posts table
exports.create = (req, res) => {

}

// Retrieves an entry from the posts table by id
exports.findOne = (req, res) => {
  const post_id = req.params.id;

  Post.findById(post_id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Could not find Post with id=${id}.`
        });
      }
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Post with id=${id}.`
      });
    });
};

// Retrieves entries from the posts table by search criteria
exports.findAll = (req, res) => {
  // Format the requirements the way mongoose expects
  let requirements = req.query;
  let condition = {};
  Object.keys(requirements).forEach(function(key) {
    condition[key] = { $regex: new RegExp(requirements[key]), $options: "i" }
  })

  // Retrieve records that match the requirements
  Post.find(condition)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Could not find Posts matching criteria.`
        });
      }
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Posts."
      });
    });
};

// Updates an entry in the posts table by id
exports.update = (req, res) => {

}

// Deletes an entry in the posts table by id
exports.delete = (req, res) => {

}

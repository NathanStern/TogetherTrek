const { mongoose } = require("../models/index.js");
const db = require("../models/index.js");
const Post = db.posts;

// Creates an entry in the posts table
exports.create = (req, res) => {
    // Validate all expected fields were passed
    if (!req.body) {
      res.status(400).send({ message: "no body." });
      return;
    }
    if (!req.body.title) {
      res.status(400).send({ message: "title can not be empty." });
      return;
    }
    if (!req.body.description) {
      res.status(400).send({ message: "description can not be empty." });
      return;
    }
    if (!req.body.post_date) {
      res.status(400).send({ message: "postDate can not be empty." });
      return;
    }
    if (!req.body.destinations) {
      res.status(400).send({ message: "destinations can not be empty." });
      return;
    }
  
    const post = new Post({
      author_id: req.body.author_id,
      title: req.body.title,
      description: req.body.description,
      post_date: req.body.post_date,
      destinations: req.body.destinations
    });
  
    post
    .save(post)
    .then(data => {
      res.send(data.id);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    });
  };
  
  // Retrieves an entry from the posts table by id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Post.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: `Could not find Post with id=${id}.` });
        }
        else {
          res.send(data);
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: `Error retrieving Post with id=${id}.` });
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
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving posts."
        });
      });
  };
  
  // Updates an entry in the posts table by id
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Cannot update Post with empty data"
      })
    }
  
    const id = req.params.id;
  
    User.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
      .then(data => {
        if (!data) {
          res.status(404).send({message: `Could not find Post with id=${id}.`});
        }
        else {
          res.send({message: "Post was updated successfully!"});
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({message: `Error retrieving Post with id=${id}.`});
      });
  }
  
  // Deletes an entry in the posts table by id
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Post.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Post with id=${id}. Maybe Post was not found.`
          });
        } else {
          res.send({
            message: "Post was deleted successfully."
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Could not delete Post with id=${id}.`
        });
      });
  };

const path = require('path');

const db = require("../models/index.js");
const s3_handler = require("../utils/s3_handler.js");

const Message = db.messages;
const User = db.users;
const Message_Board = db.message_boards;


// Creates an entry in the messages table
exports.create = (req, res) => {
  // Validate all expected fields were passed
  if (!req.body.author_id) {
    res.status(400).send({
      message: "author_id can not be empty."
    });
    return;
  }
  const author_id = req.body.author_id;

  if (!req.body.message_board_id) {
    res.status(400).send({
      message: "message_board_id can not be empty."
    });
    return;
  }
  const message_board_id = req.body.message_board_id;

  if (!req.body.type) {
    res.status(400).send({
      message: "type can not be empty."
    });
    return;
  }
  const message_type = req.body.type;

  let text = null;
  let file = null;
  if (message_type == "text") {
    if (!req.body.text) {
      res.status(400).send({
        message: "text type messages require a text field."
      });
      return;
    }
    text = req.body.text;
  } else if (message_type == "image") {
    if (!req.files || !req.files.file) {
      res.status(400).send({
        message: "image type messages require a file field."
      });
      return;
    }
    file = req.files.file;
  } else {
    res.status(400).send({
      message: "type must be either text or image."
    });
    return;
  }

  // Validate reference keys exist
  const user = User.findById(author_id);
  if (!user) {
    res.status(404).send({
      message: `User with id=${author_id} not found.`
    });
    return;
  }
  const message_board = Message_Board.findById(message_board_id);
  if (!message_board) {
    res.status(404).send({
      message: `Message_Board with id=${message_board_id} not found.`
    });
    return;
  }

  // Validate file is an image
  if (file && !file.mimetype.startsWith('image')) {
    res.status(400).send({
      message: "file must be type image."
    });
    return;
  }

// Create a message object
let message;
  if (message_type == "text") {
    message = new Message({
      author_id: author_id,
      post_date: Date.now(),
      type: "text",
      data: text,
      message_board_id: message_board_id
    });
  } else {
    message = new Message({
      author_id: author_id,
      post_date: Date.now(),
      type: "image",
      message_board_id: message_board_id
    });
  }

  // Save the message to the database
  let message_id = null;
  message
  .save()
  .then(data => {
    message_id = data.id

    // If the message is text, there is nothing left to do so return
    if (message_type == "text") {
      res.send(message_id);
      return;
    }

    // If the message is an image, we need to upload it to S3
    file.name = `${message_id}${path.parse(file.name).ext}`

    // Update the message data with the new filename
    message.data = file.name;
    message.save()
    .catch(err => {
      message.delete();
      res.status(500).send({
        message: err.message || "Failed to update Message."
      });
      return;
    });

    // Upload the file to S3
    s3_handler.upload(file)
    .catch(err => {
      message.delete();
      res.status(500).send({
        message: err.message || "Failed to upload image."
      });
      return;
    });

    // Return the message id to the user
    res.send(message_id);
    return;
  })
  .catch(err => {
    if (message_id) {
      message.delete();
    }
    res.status(500).send({
      message: err.message || "Failed to create Message."
    });
    return;
  });
};

// Retrieves an entry from the messages table by id
exports.findOne = (req, res) => {
  const message_id = req.params.id;
  Message.findById(message_id)
  .then(message => {
    if (!message) {
      res.status(404).send({
        message: `Could not find Message with id=${message_id}.`
      });
    } else {
      if (message.type == "image") {
        const filename = message.data;
        s3_handler.findOne(filename)
        .then(image => {
          res.send(image);
          return;
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Failed to find image."
          });
          return;
        });
      } else {
        res.send(message.data);
        return;
      }
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error retrieving Message with id=${message_id}.`
    });
  });
}

// Retrieves entries from the messages table by search criteria
exports.findAll = (req, res) => {

}

// Updates an entry in the messages table by id
exports.update = (req, res) => {

}

// Deletes an entry in the messages table by id
exports.delete = (req, res) => {
  const message_id = req.params.id;

  // Get the message object so we can check if we need to delete an image
  Message.findById(message_id)
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Could not find Message with id=${message_id}.`
      });
    } else {

      // If the message is an image, delete it from S3
      if (data.type == "image") {
        const filename = data.data;
        s3_handler.delete(filename)
        .catch(err => {
          res.status(500).send({
            message: err.message || "Failed to delete image."
          });
          return;
        });
      }

      // Delete the message entry in the database
      data.delete();
      res.send("success");
      return;
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error retrieving Trip_Photo with id=${trip_photo_id}.`
    });
  });
}

const db = require("../models/index.js");
const config = require('../config/config.js')
const jwt = require('jsonwebtoken')
const Message_Board = db.message_boards;
const User = db.users;
const Messages = db.messages;


// Creates an entry in the message_boards table
exports.create = (req, res) => {
    if (!req.body.user_ids) {
        res.status(400).send({ message: 'user_ids cannot be empty' });
        return;
    }

    if (req.body.user_ids.length == 0 || req.body.user_ids.length == 1) {
        res.status(400).send({ message: 'user_ids must have at least 2 members' });
        return;
    }

    const message_board = new Message_Board({
        user_ids: req.body.user_ids
    });

    message_board
        .save(message_board)
        .then((data) => {
            res.send(data.id);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the message board",
            });
        });
}

// Retrieves an entry from the message_boards table by id
// TODO: Change this to retrieve all entries with this message_board_id
exports.findOne = (req, res) => {
    let id = req.params.id;

    let messages;
    let retrieved_data;
    
    Message_Board.findById(id)
        .then(async (data) => {
            if (!data) {
                res.send({});
            } else {
                retrieved_data = data;
            }

            messages = await Messages.find({ author_id: id }).catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error ocurred while retrieving messages."
                });
                return;
            });

            res.send({
                _id: retrieved_data["_id"],
                user_ids: retrieved_data["user_ids"],
                messages: messages
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred when trying to retrieve message board",
            });
        });
}

// Retrieves entries from the message_boards table by search criteria (user_id associated with the sent token)
exports.findAll = (req, res) => {
    let requirements = req.query;

    let headers = req.headers;
    let token = headers["authorization"];

    if (!token) {
        res.status(401).send({ message: "Client did not send JWT with request in header", });
        return;
    }

    let decoded_token;
    try {
        decoded_token = jwt.verify(`${token}`, config.app.JWT_KEY);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Invalid JWT."
        });
        return;
    }

    let id = decoded_token["id"];

    Message_Board.find({ user_ids: `${id}` }).then(async (data) => {
        let num_boards = data.length;
        found_boards = [];
        if (num_boards == 0) {
            res.send(data);
        } else {
            for (i = 0; i < num_boards; i++) {
                let message_board = data[i];
                let associated_users = message_board['user_ids'];
                let resolved_users = [];
                for (j = 0; j < associated_users.length; j++) {
                    if (`${associated_users[j]}` !== id) {
                        let user = await User.findById(associated_users[j])
                            .catch((error) => {
                                res.status(500).send({ message: error.message || "unable to retrieve user associated with message board", });
                                return;
                            });
                        resolved_users.push({
                            name: `${user["first_name"]} ${user["last_name"]} `,
                            id: user["_id"],
                        });
                    }
                }
                let board_messages = await Messages.find({ message_board_id: message_board['_id'] })
                    .sort({ _id: -1 })
                    .catch((error => {
                        res.status(500).send({ message: error.message || "unable to retrieve messages from the database" });
                        return;
                    }));

                if (board_messages.length == 0) {
                    board_messages[0] = {};
                }
                
                found_boards.push({
                    _id: message_board["_id"],
                    user_ids: message_board["user_ids"],
                    other_users: resolved_users,
                    latest_message: board_messages[0],
                 });
            }
            // let message_boards = JSON.stringify(data[0]);
            // console.log(message_boards);
            res.send(found_boards);
        }
        return;
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving message boards',
        });
        return;
    });
}

// Retrieves entries from the message_boards table by search criteria (by id of the user sent into endpoint)
exports.findAllId = (req, res) => {
    let requirements = req.query;
    let id = req.params.id;

    let found_boards;

    Message_Board.find({ user_ids: `${id}` }).then(async (data) => {
        let num_boards = data.length;
        found_boards = [];
        if (num_boards == 0) {
            res.send(data);
        } else {
            for (i = 0; i < num_boards; i++) {
                let message_board = data[i];
                let associated_users = message_board['user_ids'];
                let resolved_users = [];
                for (j = 0; j < associated_users.length; j++) {
                    if (`${associated_users[j]}` !== id) {
                        let user = await User.findById(associated_users[j])
                            .catch((error) => {
                                res.status(500).send({ message: error.message || "unable to retrieve user associated with message board", });
                                return;
                            });
                        resolved_users.push({
                            name: `${user["first_name"]} ${user["last_name"]} `,
                            id: user["_id"],
                        });
                    }
                }
                let board_messages = await Messages.find({ message_board_id: message_board['_id'] })
                    .sort({ _id: -1 })
                    .catch((error => {
                        res.status(500).send({ message: error.message || "unable to retrieve messages from the database" });
                        return;
                    }));

                if (board_messages.length == 0) {
                    board_messages[0] = {};
                }
                
                found_boards.push({
                    _id: message_board["_id"],
                    user_ids: message_board["user_ids"],
                    other_users: resolved_users,
                    latest_message: board_messages[0],
                 });
            }
            // let message_boards = JSON.stringify(data[0]);
            // console.log(message_boards);
            res.send(found_boards);
        }
        return;
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving message boards',
        });
        return;
    });
}

// Updates an entry in the message_boards table by id
exports.update = (req, res) => {

}

// Deletes an entry in the message_boards table by id
exports.delete = (req, res) => {

}

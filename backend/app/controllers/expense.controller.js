const db = require("../models/index.js");
const array_helper = require('../utils/array_helper.js')
const token_helper = require('../utils/token_helper.js')

const Trip = db.trips;
const User = db.users;
const Expense = db.expenses;

// Creates an entry in the expenses table
exports.create = (req, res) => {
 // Validate all expected fields were passed
 if (!req.body) {
    res.status(400).send({ message: "no body." });
    return;
  }
  if (!req.body.expense_body) {
    res.status(400).send({ message: "expense body can not be empty." });
    return;
  }
  if (!req.body.category) {
    res.status(400).send({ message: "category can not be empty." });
    return;
  }
  if (!req.body.trip_id) {
    res.status(400).send({ message: "trip id can not be empty." });
    return;
  }

  const expense = new Expense({
    expense_body: req.body.expense_body,
    category: req.body.category,
    trip_id: req.body.trip_id,
  });

  expense
  .save(expense)
  .then(async (data) => {
    // var user = await User.findById(req.body.creator_id)
    // if (!user) {
    //     res.status(500).send({ message: "Could not update user." })
    // }
    // user.trip_ids.push(data.id)
    // User.findByIdAndUpdate(req.body.author_id, user, { useFindAndModify: false })
    //   .then((data) => {
    //       if (!data) {
    //           res.status(404).send({ message: `Could not find User with id=${id}.` })
    //       } else {
    //           res.send({ message: 'User was updated successfully!' })
    //       }
    //   })
    //   .catch((err) => {
    //       res.status(500).send({ message: `Error retrieving User with id=${id}.` })
    //   })
    res.send(data.id);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the expense."
    });
  });
};

// Retrieves an entry from the expenses table by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Expense.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: `Could not find Expense with id=${id}.` });
        }
        else {
          res.send(data);
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: `Error retrieving Expense with id=${id}.` });
    });
};

// Retrieves entries from the expenses table by search criteria
exports.findAll = (req, res) => {
    // Format the requirements the way mongoose expects
    let requirements = req.query;
    //let condition = {};
    // Object.keys(requirements).forEach(function(key) {
    // condition[key] = { $regex: new RegExp(requirements[key])}
    // })

    // Retrieve records that match the requirements
    Expense.find(requirements)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving expenses."
        });
    });
};

// Updates an entry in the expenses table by id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Cannot update Expense with empty data"
        })
        }

        const id = req.params.id;

        Expense.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
            res.status(404).send({message: `Could not find Expense with id=${id}.`});
            }
            else {
            res.send({message: "Expense was updated successfully!"});
            }
        })
        .catch(err => {
            res
            .status(500)
            .send({message: `Error retrieving Expense with id=${id}.`});
        });
}

// Deletes an entry in the expenses table by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Expense.findByIdAndRemove(id, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Expense with id=${id}. Maybe Expense was not found.`
      });
    } else {
      res.send({
        message: "Expense was deleted successfully."
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Could not delete Expense with id=${id}.`
    });
  });
}
const config = require('../config/config.js');
const db = require('../models/index.js');

const User = db.users;
const Email_Verification = db.email_verification;

exports.verify = (req, res) => {
    let id = req.params.id;

    Email_Verification.findById(id)
        .then(async (data) => {
            if (!data) {
                res.status(404).send(
                    `<html>
                    <img src="https://i.imgur.com/r0Q5WnV.jpg" title="source: imgur.com" style="display: block; margin-left: auto; margin-right: auto; width: 50%;" />
                    <h3 style="text-align: center;">The verification id '${id}' was not found. You may have already verified your email.</h3>
                </html>`);
                return;
            } else {
                var user = User.findById(data.user_id);

                await User.findByIdAndUpdate(data.user_id, {verified: true}, {useFindAndModify: false}).catch((err) => {
                    throw err;
                });
                var isRemoved = await Email_Verification.findByIdAndRemove(id, { useFindAndModify: false }).then((data) => {
                    if (!data) {
                        return 404;
                    } else {
                        return 200;
                    }
                }).catch((err) => {
                    return 500;
                });

                if (isRemoved == 200) {
                    res.send(`<html>
                    <img src="https://i.imgur.com/r0Q5WnV.jpg" title="source: imgur.com" style="display: block; margin-left: auto; margin-right: auto; width: 50%;" />
                    <h3 style="text-align: center;">Email verification was successful!</h3>
                    </html>`)
                } else if (isRemoved == 404) {
                    res.status(404).send({ message: "Verification id not found" })
                } else if (isRemoved == 500) {
                    res.status(500).send({ message: "Some error occurred when verifying the email" })
                }
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Something went wrong when verifying the email" });
        });
}
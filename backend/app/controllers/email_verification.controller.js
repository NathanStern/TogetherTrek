const config = require('../config/config.js');
const db = require('../models/index.js');

const User = db.users;
const Email_Verification = db.email_verification;

exports.verify = (req, res) => {
    let id = req.params.id;

    Email_Verification.findById(id)
        .then(async (data) => {
            if (!data) {
                res.status(404).send({ message: `Could not find email verification with id=${id}.` });
                return;
            } else {
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
                    
                } else if (isRemoved == 404) {
                    
                } else if (isRemoved == 500) {
                    
                 }
            }
        })
}
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            user_id: mongoose.Types.objectId,
        }
    );

    const Email_Verification = mongoose.model("email_verification", schema);
    return Email_Verification;
};
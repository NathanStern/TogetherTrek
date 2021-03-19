module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      username: String,
      password: String,
      email: String,
      birthdate: Date,
      gender: {
        type: String,
        enum: ["Male", "Female", "Other", "Prefer Not to Say"]
      },
      first_name: String,
      last_name: String,
      profile_pic: {
        upload_date: Date,
        filename: String
      },
      verified: Boolean,
      notifications_enabled: Boolean,
      location_enabled: Boolean,
      location: {
        type: {
          type: String,
          enum: ["Point"]
        },
        coordinates: [Number]
      },
      post_ids: [mongoose.Types.ObjectId],
      trip_ids: [mongoose.Types.ObjectId],
      message_board_ids: [mongoose.Types.ObjectId],
      friend_ids: [mongoose.Types.ObjectId],
      trip_requests: [mongoose.Types.ObjectId]
    }
  );

  const User = mongoose.model("user", schema);
  return User;
};

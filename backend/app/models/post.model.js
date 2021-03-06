module.exports = mongoose => {
  var schema = mongoose.Schema(
    /* temporary schema we'll need to fill in our own schema */
    {
      id: Number,
      username: String,
	    password: String,
	    email: String,
	    birthdate: String,
	    gender: String,
	    first_name: String,
	    last_name: String,
	    profile_pic: {
		    upload_date: String,
		    link: String
	    },
	    verified: Boolean,
	    notifications_enabled: Boolean,
	    location_enabled: Boolean,
	    location: {
		    type: String,
		    coordinates: []
	    },
	    post_ids: [],
	    trip_ids: [],
	    message_board_ids: [],
	    friend_ids: []
    },
    { timestamps: true}
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Post = mongoose.model("post", schema);
  return Post;
  };

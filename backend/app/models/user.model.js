module.exports = mongoose => {
  var schema = mongoose.Schema(
    /* temporary schema we'll need to fill in our own schema */
    {
      title: String,
      description: String,
      published: Boolean
    },
    { timestamps: true}
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
  };

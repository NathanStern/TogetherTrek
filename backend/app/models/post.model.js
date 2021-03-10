module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      author_id: mongoose.Types.ObjectId,
      title: String,
      description: String,
      post_date: Date,
      destinations: [{
        country: String,
        city: String,
        region: String
      }]
    }
  );


  const Post = mongoose.model("post", schema);
  return Post;
};

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      author_id: mongoose.Types.ObjectId,
      post_date: Date,
      filename: String,
      trip_id: mongoose.Types.ObjectId
    }
  );

  const Trip_Photo = mongoose.model("trip_photo", schema);
  return Trip_Photo;
};

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      author_id: mongoose.Types.ObjectId,
      post_date: Date,
      type: {
        type: String,
        enum: ["text", "image"]
      },
      data: String,
      message_board_id: mongoose.Types.ObjectId
    }
  );


  const Message = mongoose.model("message", schema);
  return Message;
};

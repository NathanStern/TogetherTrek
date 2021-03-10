module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      user_ids: [mongoose.Types.ObjectId]
    }
  );

  const Message_Board = mongoose.model("message_board", schema);
  return Message_Board;
};

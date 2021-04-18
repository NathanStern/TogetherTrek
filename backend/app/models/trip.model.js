module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      destination: {
        country: String,
        city: String,
        region: String
      },
      start_date: Date,
      end_date: Date,
      creator_id: mongoose.Types.ObjectId,
      participant_ids: [mongoose.Types.ObjectId],
      join_requests: [mongoose.Types.ObjectId],
      expenses: [mongoose.Types.ObjectId],
      total_expenses: Number,
      expense_per_person: Number,
      budget: Number,
    }
  );

  const Trip = mongoose.model("trip", schema);
  return Trip;
};

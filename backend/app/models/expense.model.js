module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        expense_body: {
          amount: Number,
          creator_id: mongoose.Types.ObjectId,
          description: String,
          date: Date
        },
        category: {
          type: String,
          enum: ["Food", "Transportation", "Housing", "Other"]
        },
        trip_id: mongoose.Types.ObjectId,
      }
    );
  
    const Expense = mongoose.model("expense", schema);
    return Expense;
  };
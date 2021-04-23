class ExpenseBodyModel {
  num amount;
  String creator_id;
  String description;
  String date;

  ExpenseBodyModel({this.amount, this.creator_id, this.description, this.date});

  factory ExpenseBodyModel.fromJson(Map<String, dynamic> json) {
    return ExpenseBodyModel(
        amount: json['amount'],
        creator_id: json['creator_id'],
        description: json['description'],
        date: json['date']);
  }

  Map<String, dynamic> toJson() => {
        //'_id': this.id,
        'amount': this.amount,
        'creator_id': this.creator_id,
        'description': this.description,
        'date': this.date
      };

  @override
  String toString() {
    return "\$" + amount.toString() + ", " + description + ", " + date.substring(0,10);
  }
}

import 'package:together_trek/models/ExpenseBodyModel.dart';
import 'package:flutter/material.dart';

class ExpenseModel extends ChangeNotifier {
  String id;
  ExpenseBodyModel expense_body;
  String category;
  String trip_id;

  ExpenseModel({
    this.id,
    this.expense_body,
    this.category,
    this.trip_id,
  });

  factory ExpenseModel.fromJson(Map<String, dynamic> json) {
    return ExpenseModel(
        id: json['_id'],
        category: json['category'],
        trip_id: json['trip_id'],
        expense_body: ExpenseBodyModel.fromJson(json['expense_body']));
  }
  // getters are implicit

  // void setStartDate(String newDate) {
  //   this.startDate = newDate;
  //   notifyListeners();
  // }

  // void setEndDate(String newDate) {
  //   this.endDate = newDate;
  //   notifyListeners();
  // }

  // void addParticipant(String participantId) {
  //   this.participantIds.add(participantId);
  // }

  Map<String, dynamic> toJson() => {
        //'_id': this.id,
        'expense_body': this.expense_body,
        'category': this.category,
        'trip_id': this.trip_id,
      };
      @override
  String toString() {
    return expense_body.toString();
  }
}

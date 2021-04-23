import 'package:flutter/material.dart';

import 'package:together_trek/models/ExpenseModel.dart';

class LoadedExpensesModel extends ChangeNotifier {
  List<ExpenseModel> expenses = [];
  LoadedExpensesModel({this.expenses});

  LoadedExpensesModel.empty() {
    this.expenses = [];
  }

  void resetExpenses(List<ExpenseModel> expenses) {
    this.expenses = List.from(expenses.reversed);
    notifyListeners();
  }

  // void removePost(id) {
  //   for (var i = 0; i <= this.posts.length; i++) {
  //     if (this.posts[i].id == id) {
  //       this.posts.removeAt(i);
  //       break;
  //     }
  //   }
  //   notifyListeners();
  // }
}
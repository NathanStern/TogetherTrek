import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';

import "package:together_trek/api/httpRequest.dart";
import 'package:together_trek/models/PostModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/models/ExpenseModel.dart';
import 'package:together_trek/models/ExpenseBodyModel.dart';

Future<List<ExpenseModel>> getExpenses() async {
  http.Response response = await httpGet('expenses');

  List<ExpenseModel> expenses = [];

  List<dynamic> json = jsonDecode(response.body);
  //print(response.body);

  for (int i = 0; i < json.length; i++) {
    expenses.add(ExpenseModel.fromJson(json[i]));
  }
  //print(expenses[0]);
  return expenses;
}

// Future<List<ExpenseModel>> getFoodExpenses( String trip_id) async {
//   http.Response response = await httpGet("expenses?trip_id=$trip_id&category=Food");
//   print(response.body);
  
//   List<ExpenseModel> expenses = [];

//   List<dynamic> json = jsonDecode(response.body);

//   for (int i = 0; i < json.length; i++) {
//     expenses.add(ExpenseModel.fromJson(json[i]));
//   }
//   return expenses;
// }
Future<List<ExpenseModel>> getFoodExpenses( String id) async {
  List<ExpenseModel> foodExpenses = [];

  http.Response response = await httpGet('expenses');

    List<ExpenseModel> expenses = [];

    List<dynamic> json = jsonDecode(response.body);
    //print(response.body);

    for (int i = 0; i < json.length; i++) {
      expenses.add(ExpenseModel.fromJson(json[i]));
    }

    for (int i = 0; i < expenses.length; i++) {
      if ((expenses[i].category == "Food") && (expenses[i].trip_id == id)) {
        foodExpenses.add(expenses[i]);
      }
    }
    return foodExpenses;

  }

  Future<List<ExpenseModel>> getHousingExpenses( String id) async {
  List<ExpenseModel> housingExpenses = [];

  http.Response response = await httpGet('expenses');

    List<ExpenseModel> expenses = [];

    List<dynamic> json = jsonDecode(response.body);
    //print(response.body);

    for (int i = 0; i < json.length; i++) {
      expenses.add(ExpenseModel.fromJson(json[i]));
    }

    for (int i = 0; i < expenses.length; i++) {
      if ((expenses[i].category == "Housing") && (expenses[i].trip_id == id)) {
        housingExpenses.add(expenses[i]);
      }
    }
    return housingExpenses;

  }

  Future<List<ExpenseModel>> getTranspExpenses( String id) async {
  List<ExpenseModel> transpExpenses = [];

  http.Response response = await httpGet('expenses');

    List<ExpenseModel> expenses = [];

    List<dynamic> json = jsonDecode(response.body);
    //print(response.body);

    for (int i = 0; i < json.length; i++) {
      expenses.add(ExpenseModel.fromJson(json[i]));
    }

    for (int i = 0; i < expenses.length; i++) {
      if ((expenses[i].category == "Transportation") && (expenses[i].trip_id == id)) {
        transpExpenses.add(expenses[i]);
      }
    }
    return transpExpenses;

  }
  Future<List<ExpenseModel>> getOtherExpenses( String id) async {
  List<ExpenseModel> otherExpenses = [];

  http.Response response = await httpGet('expenses');

    List<ExpenseModel> expenses = [];

    List<dynamic> json = jsonDecode(response.body);
    //print(response.body);

    for (int i = 0; i < json.length; i++) {
      expenses.add(ExpenseModel.fromJson(json[i]));
    }

    for (int i = 0; i < expenses.length; i++) {
      if ((expenses[i].category == "Other") && (expenses[i].trip_id == id)) {
        otherExpenses.add(expenses[i]);
      }
    }
    return otherExpenses;

  }

// Future<List<PostModel>> getPostsById(
//     List<PostModel> allPosts, String id) async {
//   List<PostModel> userPosts = [];

//   for (int i = 0; i < allPosts.length; i++) {
//     if (allPosts[i].authorId == id) {
//       userPosts.add(allPosts[i]);
//     }
//   }

//   return userPosts;
// }

Future<Null> makeExpense(BuildContext context, num amount, String description,
    String date, String category, String id) async {
  UserModel user = context.read<UserModel>();
  String data = jsonEncode(<String, dynamic>{
    "expense_body": {
        "amount": amount,
        "creator_id":"${user.id}",
        "description": description,
        "date": date,
      },
    "category": category,
    "trip_id": id
  });
  http.Response res = await httpPost('expenses', data);
}

// Future<String> updatePost(
//     BuildContext context,
//     String id,
//     String title,
//     String description,
//     String city,
//     String country,
//     String region,
//     PostModel post) async {
//   UserModel user = context.read<UserModel>();
//   String data = jsonEncode(<String, dynamic>{
//     "author_id": "${user.id}",
//     "title": title,
//     "post_date": DateTime.now().toString(),
//     "description": description,
//     "destinations": post.destinations
//   });
//   print(data);
//   http.Response res = await httpPut('posts/${id}', data);
//   print(res.statusCode);
//   print(res.body);
// }

// Future<bool> deletePost(String id) async {
//   http.Response res = await httpDelete('posts/${id}');
//   if (res.statusCode != 200) {
//     return false;
//   } else {
//     return true;
//   }
// }

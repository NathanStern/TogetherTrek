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

Future<List<ExpenseModel>> getFoodExpenses(
  List<ExpenseModel> allExpenses, String trip_id
) async {
  http.Response response = await httpGet('expenses?trip_id=${trip_id}');
  print(response.body);
  
  List<ExpenseModel> expenses = [];

  List<dynamic> json = jsonDecode(response.body);

  for (int i = 0; i < json.length; i++) {
    expenses.add(ExpenseModel.fromJson(json[i]));
  }
  return expenses;
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

// Future<Null> makePost(BuildContext context, String title, String description,
//     String city, String country, String region) async {
//   UserModel user = context.read<UserModel>();
//   String data = jsonEncode(<String, dynamic>{
//     "author_id": "${user.id}",
//     "title": title,
//     "post_date": DateTime.now().toString(),
//     "description": description,
//     "destinations": [
//       {
//         "city": city,
//         "country": country,
//         "region": region,
//       }
//     ]
//   });
//   http.Response res = await httpPost('posts', data);
// }

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

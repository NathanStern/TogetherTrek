import 'dart:convert';

import "package:together_trek/api/httpRequest.dart";
import 'package:together_trek/models/UserModel.dart';
import 'package:http/http.dart' as http;

// testing version of createUser()
Future<String> createUser() async {
  String data = jsonEncode(<String, dynamic>{
    'username': 'johndoe',
    'password': 'password',
    'email': 'email@gmail.com',
    'birthdate': '1990-01-01',
    'gender': 'Male',
    'first_name': 'Ryan',
    'last_name': 'Gamble'
  });
  http.Response response = await httpPost('users', data);

  String id = response.body;

  return id;
}

Future<UserModel> getUser(String id) async {
  http.Response response = await httpGet('users/${id}');

  //response.body
}

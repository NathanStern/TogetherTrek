import 'dart:convert';

import "package:together_trek/api/httpRequest.dart";
import 'package:together_trek/models/UserModel.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/painting.dart';


// testing version of createUser()
Future<String> createUser() async {
  String data = jsonEncode(<String, dynamic>{
    'username': 'mobiletest',
    'password': 'password',
    'email': 'mobiletest@gmail.com',
    'birthdate': '1990-01-01',
    'gender': 'Male',
    'first_name': 'Nathan',
    'last_name': 'Stern',
    'location': {
      'coordinates': [0, 0]
    },
  });
  http.Response response = await httpPost('users', data);

  String id = response.body;

  return id;
}

Future<UserModel> getUser(String id) async {
  http.Response response = await httpGet('users/${id}');

  return UserModel.fromJson(jsonDecode(response.body));
}

Future<int> deleteUser(String id) async {
  print(id);
  http.Response response = await httpDelete('users/${id}');

  return response.statusCode;
}

Future<NetworkImage> getProfilePic(String id) {
  return getNetworkImage('users/profile-pic/${id}');
}

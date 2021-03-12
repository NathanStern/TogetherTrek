import 'dart:convert';

import "package:together_trek/api/httpRequest.dart";
import 'package:together_trek/models/UserModel.dart';
import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:together_trek/utils/JWTUtil.dart';

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
  http.Response response = await httpDelete('users/${id}');

  return response.statusCode;
}

Future<int> userLogin(String data) async {
  http.Response response = await httpPost('users/login', data);

  if (response.statusCode != 200) {
    return response.statusCode;
  }

  Map<String, dynamic> json = jsonDecode(response.body);

  Map<String, dynamic> token = JwtDecoder.decode(json['token']);

  saveJWT(json['token']);

  return response.statusCode;
}

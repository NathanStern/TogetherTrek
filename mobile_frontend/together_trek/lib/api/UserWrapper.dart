import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';

import "package:together_trek/api/httpRequest.dart";
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/utils/JWTUtil.dart';

// testing version of createUser()
Future<int> createUser(String data) async {
  http.Response response = await httpPost('users', data);

  return response.statusCode;
}

Future<UserModel> getUser(String id) async {
  http.Response response = await httpGet('users/$id');

  return UserModel.fromJson(jsonDecode(response.body));
}

Future<UserModel> updateUser(String id, String data) async {
  http.Response response = await httpPut('users/$id', data);
  return UserModel.fromJson(jsonDecode(response.body));
}

Future<int> deleteUser(String id) async {
  http.Response response = await httpDelete('users/$id');

  return response.statusCode;
}

Future<int> sendFriendRequest(String id, String data) async {
  http.Response response = await httpPut('users/request-friend/$id', data);
  return response.statusCode;
}

Future<int> acceptFriendRequest(String id, String data) async {
  http.Response response = await httpPost('users/accept-friend/$id', data);
  return response.statusCode;
}

Future<int> declineFriendRequest(String id, String data) async {
  http.Response response = await httpPost('users/decline-friend/$id', data);
  return response.statusCode;
}

Future<int> blockUser(String id, String data) async {
  http.Response response = await httpPut('users/block-user/$id', data);
  return response.statusCode;
}

Future<int> unblockUser(String id, String data) async {
  http.Response response = await httpPost('users/unblock-user/$id', data);
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

NetworkImage getProfilePic(String id) {
  return getNetworkImage('users/profile-pic/$id');
}

Future<int> setProfilePic(String id, File file) async {
  int response = await httpPutFile("/users/profile-pic/$id", file);
  return response;
}

Future<List<Map<String, dynamic>>> getNearbyUsers(String id, String range) async {
  http.Response response = await httpGet('users/nearby-users/$id?range=$range');
  return jsonDecode(response.body);
}

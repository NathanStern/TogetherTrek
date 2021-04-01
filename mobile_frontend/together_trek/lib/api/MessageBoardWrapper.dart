import 'dart:convert';

import 'package:flutter/material.dart';
import "package:provider/provider.dart";
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

import "package:together_trek/api/httpRequest.dart";
import 'package:together_trek/models/ContentModel.dart';
import 'package:together_trek/models/MessageBoardModel.dart';
import 'package:together_trek/models/MessageSummaryListModel.dart';
import 'package:together_trek/models/UserModel.dart';

Future<MessageSummaryListModel> getMessageSummaries(String jwt) async {
  if ((jwt == null) || (jwt == "")) {
    return MessageSummaryListModel.empty();
  }

  http.Response response = await httpGetWithHeaders(
      'message_boards', <String, String>{
    'Content-Type': 'application/json; charset=UTF8',
    'Authorization': jwt
  });

  var body = jsonDecode(response.body);

  if ((body is Map<String, dynamic>) && (body["meesage"] != null)) {
    return MessageSummaryListModel.empty();
  }

  return MessageSummaryListModel.fromJsonArray(jsonDecode(response.body));
}

Future<MessageBoardModel> getMessageBoard(String id) async {
  http.Response response = await httpGet('message_boards/$id');

  return MessageBoardModel.fromJson(jsonDecode(response.body));
}

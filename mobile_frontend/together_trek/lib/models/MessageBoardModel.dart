import 'dart:convert';

import 'package:together_trek/models/ContentModel.dart';

class MessageBoardModel {
  String id;
  List<dynamic> userIds;
  List<ContentModel> messages;

  MessageBoardModel({this.id, this.userIds, this.messages});

  MessageBoardModel.empty() {
    this.id = "";
    this.userIds = [];
    this.messages = [];
  }

  factory MessageBoardModel.fromJson(Map<String, dynamic> json) {
    List<ContentModel> messages = [];

    for (int i = 0; i < json['messages'].length; i++) {
      messages.add(ContentModel.fromJson(json['messages'][i]));
    }

    return MessageBoardModel(
        id: json['_id'], userIds: json['user_ids'], messages: messages);
  }

  // getters are implicit

  void addUser(String userId) {
    this.userIds.add(userId);
  }
}

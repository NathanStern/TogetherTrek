import 'package:together_trek/models/ContentModel.dart';
import 'package:flutter/material.dart';

class MessageBoardModel extends ChangeNotifier {
  String id;
  List<String> userIds;
  List<ContentModel> messages;

  MessageBoardModel(
      String id, List<String> userIds, List<ContentModel> messages) {
    this.id = id;
    this.userIds = userIds;
    this.messages = messages;
    notifyListeners();
  }

  // getters are implicit

  void addUser(String userId) {
    this.userIds.add(userId);
    notifyListeners();
  }
}

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:together_trek/models/MessageSummaryModel.dart';

class MessageSummaryListModel extends ChangeNotifier {
  List<MessageSummaryModel> messageBoards;

  MessageSummaryListModel({this.messageBoards});

  MessageSummaryListModel.empty() {
    this.messageBoards = [];
  }

  factory MessageSummaryListModel.fromJsonArray(List<dynamic> json) {
    List<MessageSummaryModel> summaries = [];
    for (int i = 0; i < json.length; i++) {
      summaries.add(MessageSummaryModel.fromJson(json[i]));
    }
    return MessageSummaryListModel(messageBoards: summaries);
  }

  void setAllFields(MessageSummaryListModel list) {
    this.messageBoards = list.messageBoards;
    notifyListeners();
  }
}

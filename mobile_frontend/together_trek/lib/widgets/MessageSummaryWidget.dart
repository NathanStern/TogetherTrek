import 'dart:math';

import 'package:flutter/material.dart';
import 'package:together_trek/models/MessageSummaryListModel.dart';

import 'package:together_trek/models/MessageSummaryModel.dart';

String _expandMessageNames(MessageSummaryModel messageBoard) {
  String expandedNames = "";

  for (int i = 0; i < messageBoard.otherUsers.length; i++) {
    if (i != 0 && i != messageBoard.otherUsers.length - 1) {
      expandedNames += ", ";
    } else if (i != 0 && i != messageBoard.otherUsers.length - 1) {
      expandedNames += ", and";
    }
    expandedNames += messageBoard.otherUsers[i].name;
  }

  return expandedNames;
}

Widget createMessageSummaryWidget(MessageSummaryModel messageBoard) {
  return Container(
    child: Card(
        child: InkWell(
            enableFeedback: true,
            splashColor: Colors.deepOrangeAccent,
            onTap: () {},
            child: Column(
              children: [
                Row(
                  children: <Widget>[
                    Flexible(
                        child: Container(
                            padding: EdgeInsets.all(10),
                            child: Text("${_expandMessageNames(messageBoard)}",
                                style: TextStyle(
                                    fontSize: 16, color: Colors.grey[850]))))
                  ],
                ),
                Row()
              ],
            ))),
  );
}

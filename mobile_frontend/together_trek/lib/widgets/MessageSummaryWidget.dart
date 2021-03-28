import 'dart:math';

import 'package:flutter/material.dart';
import 'package:together_trek/models/MessageSummaryListModel.dart';

import 'package:together_trek/models/MessageSummaryModel.dart';

List<String> months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

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
  DateTime date = DateTime.tryParse(messageBoard.latestMessage.postDate);
  String halfDay = "AM";
  if (date.hour >= 12) {
    halfDay = "PM";
  }
  String timestamp =
      "${date.hour}:${date.minute} $halfDay ${months[date.month - 1]} ${date.day}";
  return Container(
    child: Card(
        child: InkWell(
            borderRadius: BorderRadius.circular(2.5),
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
                          child: Align(
                              alignment: Alignment.centerLeft,
                              child: Text(
                                  "${_expandMessageNames(messageBoard)}",
                                  style: TextStyle(
                                      fontSize: 16, color: Colors.grey[850])))),
                    )
                  ],
                ),
                Row(
                  children: [
                    Flexible(
                        child: Container(
                      padding: EdgeInsets.only(bottom: 10, left: 12),
                      child: Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                              messageBoard.latestMessage.data.length > 35
                                  ? messageBoard.latestMessage.data
                                      .replaceRange(
                                          33,
                                          messageBoard
                                              .latestMessage.data.length,
                                          "...")
                                  : messageBoard.latestMessage.data,
                              style: TextStyle(color: Colors.grey))),
                    )),
                    Spacer(),
                    Flexible(
                        child: Container(
                            padding: EdgeInsets.only(bottom: 10, right: 12),
                            child: Align(
                                alignment: Alignment.centerRight,
                                child: Text(
                                  timestamp,
                                  style: TextStyle(color: Colors.grey),
                                ))))
                  ],
                )
              ],
            ))),
  );
}

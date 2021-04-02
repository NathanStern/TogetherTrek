import 'dart:math';

import 'package:flutter/material.dart';
import 'package:together_trek/api/MessageBoardWrapper.dart';
import 'package:together_trek/models/MessageSummaryListModel.dart';

import 'package:together_trek/models/MessageSummaryModel.dart';
import 'package:together_trek/views/ConversationView.dart';

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

Widget createMessageSummaryWidget(
    BuildContext context, MessageSummaryModel messageBoard) {
  String timestamp;
  if (messageBoard.latestMessage.type == "empty") {
    timestamp = "";
  } else {
    DateTime date = DateTime.tryParse(messageBoard.latestMessage.postDate);
    date = date.toLocal();
    String halfDay = "AM";
    int isAfternoon = 0;
    if (date.hour >= 12) {
      isAfternoon = 1;
      halfDay = "PM";
    }
    int hour = date.hour;

    hour -= 12 * isAfternoon;
    if (hour == 0) {
      hour = 12;
    }
    timestamp =
        "$hour:${date.minute} $halfDay ${months[date.month - 1]} ${date.day}";
  }
  String messagePreview = "";

  if (messageBoard.latestMessage.type == "text") {
    messagePreview = messageBoard.latestMessage.data.length > 20
        ? messageBoard.latestMessage.data
            .replaceRange(20, messageBoard.latestMessage.data.length, "...")
        : messageBoard.latestMessage.data;
  } else if (messageBoard.latestMessage.type == "empty") {
    messagePreview = "";
  } else {
    messagePreview = "Image";
  }
  return Container(
    child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(3)),
        child: InkWell(
            borderRadius: BorderRadius.circular(3),
            enableFeedback: true,
            splashColor: Colors.deepOrangeAccent,
            onTap: () {
              //getMessageBoard(messageBoard.id);
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => ConversationView(
                            messageSummary: messageBoard,
                            messageName: _expandMessageNames(messageBoard),
                          )));
            },
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
                          child: Text(messagePreview,
                              style: TextStyle(color: Colors.grey))),
                    )),
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

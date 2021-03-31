import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:provider/provider.dart';

import 'package:together_trek/api/MessageBoardWrapper.dart';
import 'package:together_trek/models/MessageSummaryListModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/widgets/MessageSummaryWidget.dart';

class MessagesView extends StatefulWidget {
  _MessagesViewState createState() => _MessagesViewState();
}

class _MessagesViewState extends State<MessagesView> {
  void _getMessages(MessageSummaryListModel summaries) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    summaries.setAllFields(await getMessageSummaries(prefs.getString("jwt")));
  }

  @override
  Widget build(BuildContext context) {
    MessageSummaryListModel summaries = context.read<MessageSummaryListModel>();
    UserModel user = context.watch<UserModel>();
    if (user.id == "") {
      return RefreshIndicator(
          onRefresh: () {},
          child: Container(
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text("Sign in to view messages",
                        style: TextStyle(fontSize: 18, color: Colors.grey)),
                  ],
                ),
              ])));
    } else if (summaries.messageBoards.isEmpty) {
      Future.delayed(Duration(seconds: 0), () async {
        await _getMessages(summaries);
        if (this.mounted) {
          setState(() {});
        }
      });
      return RefreshIndicator(
          onRefresh: () {},
          child: Container(
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text("Nothing Here",
                        style: TextStyle(fontSize: 18, color: Colors.grey)),
                  ],
                ),
                ElevatedButton(
                  child: Text("Refresh"),
                  onPressed: () async {
                    await _getMessages(summaries);
                    if (this.mounted) {
                      setState(() {});
                    }
                    return true;
                  },
                ),
              ])));
    }
    return RefreshIndicator(
        child: ListView.builder(
            itemCount: summaries.messageBoards.length,
            itemBuilder: (BuildContext context, int index) {
              return createMessageSummaryWidget(
                  context, summaries.messageBoards[index]);
            }),
        onRefresh: () async {
          await _getMessages(summaries);
          if (this.mounted) {
            setState(() {});
          }
          return true;
        });
  }
}

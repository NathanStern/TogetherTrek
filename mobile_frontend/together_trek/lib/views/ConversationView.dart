import 'package:flutter/material.dart';
import 'package:together_trek/models/MessageSummaryModel.dart';

class ConversationView extends StatefulWidget {
  MessageSummaryModel messageSummary;
  String messageName;

  ConversationView({Key key, this.messageSummary, this.messageName})
      : super(key: key);

  _ConversationViewState createState() => _ConversationViewState(
      messageSummary: this.messageSummary, messageName: this.messageName);
}

class _ConversationViewState extends State<ConversationView> {
  MessageSummaryModel messageSummary;
  String messageName;

  _ConversationViewState({this.messageSummary, this.messageName});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(this.messageName),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                  "Most Recent Message: ${this.messageSummary.latestMessage.data}"),
            ],
          ),
        ],
      ),
    );
  }
}

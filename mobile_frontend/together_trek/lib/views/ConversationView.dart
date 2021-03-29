import 'package:flutter/material.dart';
import 'package:together_trek/models/MessageSummaryModel.dart';

class ConversationView extends StatefulWidget {
  MessageSummaryModel messageSummary;

  ConversationView({Key key, this.messageSummary}) : super(key: key);

  _ConversationViewState createState() =>
      _ConversationViewState(messageSummary: this.messageSummary);
}

class _ConversationViewState extends State<ConversationView> {
  MessageSummaryModel messageSummary;

  _ConversationViewState({this.messageSummary});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(this.messageSummary.latestMessage.data),
        ],
      ),
    );
  }
}

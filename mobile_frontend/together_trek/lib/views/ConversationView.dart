import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:together_trek/api/MessageBoardWrapper.dart';
import 'package:together_trek/models/ContentModel.dart';
import 'package:together_trek/models/MessageBoardModel.dart';
import 'package:together_trek/models/MessageSummaryModel.dart';
import 'package:together_trek/models/UserModel.dart';

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
  UserModel user;

  int initialLoad = 1;

  final _messageController = TextEditingController();

  final FocusNode _messageNode = new FocusNode();

  MessageBoardModel messageBoard = MessageBoardModel.empty();

  ScrollController _scrollController =
      ScrollController(initialScrollOffset: 0.0, keepScrollOffset: true);

  _ConversationViewState({this.messageSummary, this.messageName});

  void _loadMessages() async {
    messageBoard = await getMessageBoard(messageSummary.id);
  }

  @override
  void dispose() {
    _messageNode.dispose();
    _messageController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _sendMessage(BuildContext context, String message) async {
    if (message == "") {
      return;
    }
    bool valid =
        await sendTextMessage(user.id, messageBoard.id, "text", message);
    print(valid);
  }

  @override
  Widget build(BuildContext context) {
    Future.delayed(Duration(seconds: 0), () async {
      user = context.read<UserModel>();
      if (user == null) {
        Navigator.of(context).pop();
      }
      if (initialLoad == 1) {
        await _loadMessages();
        initialLoad = 0;

        if (this.mounted) {
          setState(() {});
        }
      }
    });
    return GestureDetector(
        onTap: () {
          FocusScopeNode currentNode = FocusScope.of(context);

          if (!currentNode.hasPrimaryFocus) {
            currentNode.unfocus();
          }
        },
        child: Scaffold(
          appBar: AppBar(
            title: Text(this.messageName),
          ),
          body: Stack(
            children: [
              ListView.builder(
                  controller: _scrollController,
                  physics: BouncingScrollPhysics(),
                  // keyboardDismissBehavior:
                  //     ScrollViewKeyboardDismissBehavior.onDrag,
                  reverse: false,
                  padding: EdgeInsets.all(10),
                  // shrinkWrap: true,
                  itemCount: messageBoard.messages.length + 1,
                  itemBuilder: (BuildContext context, int index) {
                    // return Text(messageBoard.messages[index].data);
                    if (index == messageBoard.messages.length) {
                      return Container(
                          child: SizedBox(
                        height: 80,
                        width: double.infinity,
                      ));
                    }
                    return Container(
                      padding: EdgeInsets.only(
                          top: 8, bottom: 8, left: 10, right: 10),
                      child: Align(
                        alignment:
                            (messageBoard.messages[index].authorId == user.id)
                                ? Alignment.topRight
                                : Alignment.topLeft,
                        child: Container(
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20),
                              color: (messageBoard.messages[index].authorId ==
                                      user.id)
                                  ? Colors.deepOrange.shade200
                                  : Colors.grey.shade200),
                          child: Text(messageBoard.messages[index].data),
                          padding: EdgeInsets.all(16),
                        ),
                      ),
                    );
                  }),
              Align(
                  alignment: Alignment(
                      Alignment.bottomCenter.x, Alignment.bottomCenter.y),
                  // alignment: Alignment.bottomLeft,
                  child: Container(
                    height: 60,
                    width: double.infinity,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(15),
                        color: Colors.white),
                  )),
              Align(
                alignment: Alignment(
                    Alignment.bottomCenter.x, Alignment.bottomCenter.y - 0.065),
                // alignment: Alignment.bottomLeft,
                child: Container(
                    height: 60,
                    width: MediaQuery.of(context).size.width - 14,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(15),
                        color: Colors.grey.shade200),
                    child: Row(children: [
                      Expanded(
                        child: Container(
                          padding: EdgeInsets.only(right: 10, left: 10),
                          child: TextField(
                              controller: _messageController,
                              keyboardType: TextInputType.text,
                              textInputAction: TextInputAction.send,
                              onSubmitted: (value) {
                                _sendMessage(context, _messageController.text);
                                if (_messageController.text == "") {
                                  return;
                                }
                                messageBoard.messages.add(ContentModel(
                                    id: "testing",
                                    authorId: user.id,
                                    postDate: DateTime.now().toString(),
                                    type: "text",
                                    data: _messageController.text,
                                    collectionId: messageBoard.id));
                                _messageController.text = "";
                                setState(() {});
                                Future.delayed(Duration(milliseconds: 50), () {
                                  _scrollController.jumpTo(
                                    _scrollController.position.maxScrollExtent *
                                        1,
                                  );
                                });
                              },
                              onTap: () {
                                Future.delayed(Duration(milliseconds: 200), () {
                                  _scrollController.animateTo(
                                      _scrollController
                                              .position.maxScrollExtent *
                                          1,
                                      duration: Duration(milliseconds: 300),
                                      curve: Curves.fastOutSlowIn);
                                });
                              },
                              decoration: InputDecoration(
                                  hintText: "Message",
                                  border: InputBorder.none)),
                        ),
                      ),
                      Material(
                          type: MaterialType.transparency,
                          child: IconButton(
                              splashRadius: 30,
                              highlightColor: Colors.deepOrangeAccent,
                              icon: Icon(Icons.send_rounded),
                              onPressed: () {
                                _sendMessage(context, _messageController.text);
                                if (_messageController.text == "") {
                                  return;
                                }
                                messageBoard.messages.add(ContentModel(
                                    id: "testing",
                                    authorId: user.id,
                                    postDate: DateTime.now().toString(),
                                    type: "text",
                                    data: _messageController.text,
                                    collectionId: messageBoard.id));
                                _messageController.text = "";
                                setState(() {});
                                Future.delayed(Duration(milliseconds: 50), () {
                                  _scrollController.jumpTo(
                                    _scrollController.position.maxScrollExtent *
                                        1,
                                  );
                                });
                              }))
                    ])),
              ),
            ],
          ),
        ));
  }
}

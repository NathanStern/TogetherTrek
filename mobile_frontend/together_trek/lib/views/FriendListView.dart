import 'package:flutter/material.dart';
import 'package:together_trek/models/UserModel.dart';

class FriendListView extends StatefulWidget {
  FriendListView({Key key, this.user}) : super(key: key);
  UserModel user;

  _FriendListViewState createState() => _FriendListViewState(user: user);
}

class _FriendListViewState extends State<FriendListView> {
  _FriendListViewState({this.user});
  UserModel user;
  @override
  Widget build(BuildContext context) {
    if (user == null || user.friendIds.length == 0) {
      return Scaffold(
          appBar: AppBar(
        title: Text("Friends"),
      ),
      body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            SizedBox(
              height: 20.0,
            ),
            Text(
              "No Friend",
              style: TextStyle(
                fontSize: 22.0,
                fontStyle: FontStyle.italic,
                fontWeight: FontWeight.w300,
                color: Colors.black,
                letterSpacing: 2.0,
              ),
            ),
          ],
        ));
    } else {
      return Scaffold(
        appBar: AppBar(
          title: Text("Friends"),
        ),
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            SizedBox(
              height: 10.0,
            ),
            Text(
              user.username,
              style: TextStyle(
                fontSize: 22.0,
                fontStyle: FontStyle.italic,
                fontWeight: FontWeight.w300,
                color: Colors.black,
                letterSpacing: 2.0,
              ),
            ),
          ],
        ),
      );
    }
  }
}

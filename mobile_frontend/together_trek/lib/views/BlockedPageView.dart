import 'package:flutter/material.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/api/UserWrapper.dart';

class BlockedPageView extends StatefulWidget {
  BlockedPageView({Key key, this.user}) : super(key: key);
  UserModel user;

  _BlockedPageViewState createState() => _BlockedPageViewState(user: user);
}

class _BlockedPageViewState extends State<BlockedPageView> {
  _BlockedPageViewState({this.user});
  UserModel user;
  @override
  Widget build(BuildContext context) {
    if (user == null) {
      return Scaffold(
          appBar: AppBar(
        title: Text("Blocked Users"),
      ),
      body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            SizedBox(
              height: 10.0,
            ),
            Text(
              "No Users",
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
          title: Text("Blocked Users"),
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

import 'package:flutter/material.dart';
import 'package:together_trek/models/UserModel.dart';


class BlockedListView extends StatefulWidget {
  BlockedListView({Key key, this.user}) : super(key: key);
  UserModel user;

  _BlockedListViewState createState() => _BlockedListViewState(user: user);
}

class _BlockedListViewState extends State<BlockedListView> {
  _BlockedListViewState({this.user});
  UserModel user;
  @override
  Widget build(BuildContext context) {
    if (user == null ) {
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
              "No Blocked Users",
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
            Row(children: <Widget>[
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: ElevatedButton(
                  onPressed: () async {},
                  child: Text('Unblock'),
                ),
              ),
            ])
          ],
        ),
      );
    }
  }
}

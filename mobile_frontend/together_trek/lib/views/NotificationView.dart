import 'package:flutter/material.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/api/UserWrapper.dart';

class NotificationView extends StatefulWidget {
  NotificationView({Key key, this.user}) : super(key: key);
  UserModel user;

  _NotificationViewState createState() => _NotificationViewState(user: user);
}

class _NotificationViewState extends State<NotificationView> {
  _NotificationViewState({this.user});
  UserModel user;
  @override
  Widget build(BuildContext context) {
    if (user == null ) {
      return Scaffold(
          appBar: AppBar(
            title: Text("Notification"),
          ),
          body: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              SizedBox(
                height: 10.0,
              ),
              Text(
                "No Notifications",
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
          title: Text("Friend Request From"),
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
                  child: Text('Accept'),
                ),
              ),
              Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: ElevatedButton(
                    onPressed: () async {},
                    child: Text('Decline'),
                  )),
            ])
          ],
        ),
      );
    }
  }
}

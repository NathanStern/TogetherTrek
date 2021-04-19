import 'package:flutter/material.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:provider/provider.dart';

class NotificationView extends StatefulWidget {
  _NotificationViewState createState() => _NotificationViewState();
}

class _NotificationViewState extends State<NotificationView> {
  UserModel user;
  @override
  Widget build(BuildContext context) {
    user = context.watch<UserModel>();
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          title: Text('Notifications', style: TextStyle(color: Colors.deepOrangeAccent)),
        ),
        body: ListView.builder(
          itemCount: user.friendIds.length,
          itemBuilder: (context, index) {
            return ListTile(
              title: Text('${user.friendIds[index]}'),
            );
          },
        ),
      ),
    );
  }
}

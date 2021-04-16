import 'package:flutter/material.dart';
import 'package:package_info/package_info.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:together_trek/api/UserWrapper.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/HomeDrawerView.dart';

import 'package:provider/provider.dart';

class FriendListView extends StatefulWidget {
  _FriendListViewState createState() => _FriendListViewState();
}

class _FriendListViewState extends State<FriendListView> {
  UserModel user;
  @override
  Widget build(BuildContext context) {
    user = context.watch<UserModel>();
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      
      home: Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: Icon(Icons.arrow_back, color: Colors.black),
            onPressed: () => Navigator.of(context).pop(),
          ), 
          backgroundColor: Colors.white,
          title: Text('Friends', style: TextStyle(color: Colors.deepOrangeAccent)),
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

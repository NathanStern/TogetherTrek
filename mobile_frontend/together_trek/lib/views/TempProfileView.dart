//import 'dart:html';
import 'dart:convert';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/ProfileInfoView.dart';
import 'package:together_trek/views/ProfileInfoView.dart';
import 'package:together_trek/api/UserWrapper.dart' as UserWrapper;
import 'package:together_trek/views/EditPostView.dart';
import 'package:flutter/material.dart';
import 'package:together_trek/models/UserModel.dart';

class TempProfileView extends StatefulWidget {
  TempProfileView({Key key, this.user}) : super(key: key);
  UserModel user;
  _TempProfileViewState createState() => _TempProfileViewState(user: user);
}

class _TempProfileViewState extends State<TempProfileView> {
  _TempProfileViewState({this.user});
  UserModel user;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Profile Author"),
      ),
      body: TempAuthorProfile(user: user),
    );
  }
}

class TempAuthorProfile extends StatefulWidget {
  TempAuthorProfile({Key key, this.user}) : super(key: key);
  UserModel user;
  @override
  TempAuthorProfileState createState() {
    return TempAuthorProfileState(user: user);
  }
}

class TempAuthorProfileState extends State<TempAuthorProfile> {
  TempAuthorProfileState({this.user});
  UserModel user;
  UserModel viewer;
  String _viewId;
  String _viewerName;
  @override
  Widget build(BuildContext context) {
    viewer = context.watch<UserModel>();
    _viewId = this.viewer.id;
    _viewerName = this.viewer.username;
    return SingleChildScrollView(
      child: Column(
        children: <Widget>[
          Container(
              decoration: BoxDecoration(
                  gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [Colors.redAccent, Colors.orangeAccent])),
              child: Container(
                width: double.infinity,
                height: 350.0,
                child: Center(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      CircleAvatar(
                        backgroundImage: this.user.profilePic,
                        radius: 50.0,
                      ),
                      SizedBox(
                        height: 10.0,
                      ),
                      Text(
                        this.user.username,
                        style: TextStyle(
                          fontSize: 22.0,
                          color: Colors.white,
                        ),
                      ),
                      SizedBox(
                        height: 10.0,
                      ),
                      Card(
                        margin: EdgeInsets.symmetric(
                            horizontal: 20.0, vertical: 5.0),
                        clipBehavior: Clip.antiAlias,
                        color: Colors.white,
                        elevation: 5.0,
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 8.0, vertical: 22.0),
                          child: Row(
                            children: <Widget>[
                              Expanded(
                                child: Column(
                                  children: <Widget>[
                                    Text(
                                      "Gender",
                                      style: TextStyle(
                                        color: Colors.redAccent,
                                        fontSize: 22.0,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    SizedBox(
                                      height: 5.0,
                                    ),
                                    Text(
                                      this.user.gender,
                                      style: TextStyle(
                                        fontSize: 20.0,
                                        color: Colors.orangeAccent,
                                      ),
                                    )
                                  ],
                                ),
                              ),
                              Expanded(
                                child: Column(
                                  children: <Widget>[
                                    Text(
                                      "From",
                                      style: TextStyle(
                                        color: Colors.redAccent,
                                        fontSize: 22.0,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    SizedBox(
                                      height: 5.0,
                                    ),
                                    Text(
                                      this.user.city,
                                      style: TextStyle(
                                        fontSize: 20.0,
                                        color: Colors.orangeAccent,
                                      ),
                                    )
                                  ],
                                ),
                              ),
                              Expanded(
                                child: Column(
                                  children: <Widget>[
                                    Text(
                                      "Birthdate",
                                      style: TextStyle(
                                        color: Colors.redAccent,
                                        fontSize: 22.0,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    SizedBox(
                                      height: 5.0,
                                    ),
                                    Text(
                                      this.user.birthdate,
                                      style: TextStyle(
                                        fontSize: 20.0,
                                        color: Colors.orangeAccent,
                                      ),
                                    )
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      )
                    ],
                  ),
                ),
              )),
          Container(
            child: Padding(
              padding:
                  const EdgeInsets.symmetric(vertical: 30.0, horizontal: 16.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    "Bio:",
                    style: TextStyle(
                        color: Colors.redAccent,
                        fontStyle: FontStyle.normal,
                        fontSize: 28.0),
                  ),
                  SizedBox(
                    height: 10.0,
                  ),
                  Text(
                    '',
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
            ),
          ),
          SizedBox(
            height: 20.0,
          ),
          Container(
            width: 300.00,
            child: RaisedButton(
                onPressed: () {
                  //send friend request
                  UserWrapper.sendFriendRequest(_viewId, jsonEncode(<String, dynamic>{"username": _viewerName}),);
                },
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(80.0)),
                elevation: 1.0,
                padding: EdgeInsets.all(0.0),
                child: Ink(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                        begin: Alignment.centerRight,
                        end: Alignment.centerLeft,
                        colors: [Colors.redAccent, Colors.orangeAccent]),
                    borderRadius: BorderRadius.circular(30.0),
                  ),
                  child: Container(
                    constraints:
                        BoxConstraints(maxWidth: 300.0, minHeight: 50.0),
                    alignment: Alignment.center,
                    child: Text(
                      "Send Friend Request",
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 26.0,
                          fontWeight: FontWeight.w300),
                    ),
                  ),
                )),
          ),
        ],
      ),
    );
  }
}

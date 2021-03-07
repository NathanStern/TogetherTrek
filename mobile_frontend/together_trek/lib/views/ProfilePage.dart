import 'dart:math';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/ProfileInfoView.dart';

class ProfilePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
            child: Center(
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
          Consumer<UserModel>(
              builder: (context, user, child) => Container(
                  child: Column(children: [ProfileInfoView(user: user)]))),
          Container(
              padding: EdgeInsets.all(10),
              child: Icon(Icons.person_rounded,
                  size: min(MediaQuery.of(context).size.height / 2,
                      MediaQuery.of(context).size.width / 2))),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Column(
                children: [
                  Container(padding: EdgeInsets.all(10), child: Text("Hello")),
                  Container(padding: EdgeInsets.all(10), child: Text("Obi"))
                ],
              ),
              Column(children: [
                Container(padding: EdgeInsets.all(10), child: Text("There")),
                Container(padding: EdgeInsets.all(10), child: Text("Wan")),
              ])
            ],
          )
        ]))));
  }
}

import 'dart:math';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/ProfileInfoView.dart';

class ProfilePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        // appBar: AppBar(title: Text("Profile")),
        body: Container(
            child:
                Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      Center(
        child: Consumer<UserModel>(
            builder: (context, user, child) => Container(
                child: Column(children: [ProfileInfoView(user: user)]))),
      )
    ])));
  }
}

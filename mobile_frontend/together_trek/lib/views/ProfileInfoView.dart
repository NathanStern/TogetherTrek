import 'package:flutter/material.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/ProfilePage.dart';

class ProfileInfoView extends StatelessWidget {
  ProfileInfoView({Key key, this.user}) : super(key: key);

  UserModel user;

  @override
  Widget build(BuildContext context) {
    if (this.user.isEmpty()) {
      return Container(
          child: Column(
        children: [Text("User is not logged in"), ProfilePage()],
      ));
    } else {
      return Text("User is logged in");
    }
  }
}

import 'package:flutter/material.dart';
import 'package:together_trek/models/LocationModel.dart';
import 'package:together_trek/models/ProfilePicModel.dart';
import 'package:together_trek/models/UserModel.dart';

class ProfileInfoView extends StatelessWidget {
  ProfileInfoView({Key key, this.user}) : super(key: key);

  UserModel user;

  @override
  Widget build(BuildContext context) {
    if (this.user.isEmpty()) {
      return Container(
          child: Column(
        children: [
          Text("User is not logged in"),
          ElevatedButton(child: Text("Log In"), onPressed: () {}),
          Text("Don't have an account?"),
          TextButton(
              onPressed: () {},
              child: Text("Register"),
              style: ButtonStyle(enableFeedback: true))
        ],
      ));
    } else {
      return Container(
          child: Column(
        children: [
          // This is strictly for debugging purposes
          Text(this.user.id),
          Text(this.user.email),
          Text(this.user.firstName),
          Text(this.user.lastName),
          Text(this.user.birthdate),
          Text(this.user.gender),
          Text(this.user.profilePic.toString()),
          Text(this.user.verified.toString()),
          Text(this.user.notificationsEnabled.toString()),
          Text(this.user.locationEnabled.toString()),
          Text(this.user.postIds.toString()),
          Text(this.user.tripIds.toString()),
          Text(this.user.messageBoardIds.toString()),
          Text(this.user.friendIds.toString()),
          Text(this.user.location.toString()),
        ],
      ));
    }
  }
}

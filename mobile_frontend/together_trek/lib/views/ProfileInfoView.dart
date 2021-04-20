import 'package:flutter/material.dart';
import 'package:together_trek/models/LocationModel.dart';
import 'package:together_trek/models/ProfilePicModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/LoginView.dart';
import 'package:provider/provider.dart';

class ProfileInfoView extends StatefulWidget {
  ProfileInfoView({Key key, this.user}) : super(key: key);
  UserModel user;
  _ProfileInfoViewState createState() => _ProfileInfoViewState(user: user);
}

class _ProfileInfoViewState extends State<ProfileInfoView> {
  _ProfileInfoViewState({Key key, this.user});

  UserModel user;

  @override
  Widget build(BuildContext context) {
    user = context.watch<UserModel>();
    if (this.user.id == "") {
      return Container(
          child: Column(
        children: [
          Text("User is not logged in"),
          ElevatedButton(
              child: Text("Log In"),
              onPressed: () {
                setState(() {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => LoginView(user: this.user)));
                });
              }),
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
          Text(this.user.city),
          Text(this.user.country),
        ],
      ));
    }
  }
}

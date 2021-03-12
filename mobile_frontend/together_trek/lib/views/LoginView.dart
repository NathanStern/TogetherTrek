import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:together_trek/models/LocationModel.dart';
import 'package:together_trek/models/ProfilePicModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/api/UserWrapper.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:provider/provider.dart';

class LoginView extends StatefulWidget {
  LoginView({Key key, this.user}) : super(key: key);

  UserModel user;
  _LoginViewState createState() => _LoginViewState(user: this.user);
}

class _LoginViewState extends State<LoginView> {
  _LoginViewState({Key key, this.user});
  bool _firstLogin = true;

  UserModel user;
  @override
  Widget build(BuildContext context) {
    user = context.read<UserModel>();
    return Scaffold(
        appBar: AppBar(title: Text("Log In")),
        body: Container(
            child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                child: Text("Log in"),
                onPressed: () async {
                  if (_firstLogin) {
                    _firstLogin = false;
                    String id = await createUser();
                    UserModel fetchedUser = await getUser(id);
                    //print(jsonEncode(context.read<UserModel>()));

                    this.user.setAllFieldsFromUser(fetchedUser);
                    SharedPreferences prefs =
                        await SharedPreferences.getInstance();

                    //print(prefs.getString('user'));

                    // UserModel userModel =
                    //     UserModel.fromJson(jsonDecode(prefs.getString('user')));

                    // userModel.setAllFieldsFromUser(this.user);

                    // if (this.user.profilePic != null) {
                    //   this.user.profilePic = null;
                    // }

                    // jsonEncode({
                    //   '_id': this.user.id,
                    //   'username': this.user.username,
                    //   'email': this.user.email,
                    //   'birthdate': this.user.birthdate,
                    //   'gender': this.user.gender,
                    //   'first_name': this.user.firstName,
                    //   'last_name': this.user.lastName,
                    //   'profile_pic': this.user.profilePic,
                    //   'verified': this.user.verified,
                    //   'notifications_enabled': this.user.notificationsEnabled,
                    //   'location_enabled': this.user.locationEnabled,
                    //   'post_ids': this.user.postIds.toList(),
                    //   'trip_ids': this.user.tripIds.toList(),
                    //   'message_board_ids': this.user.messageBoardIds.toList(),
                    //   'friend_ids': this.user.friendIds.toList(),
                    //   'location': {
                    //     'coordinates': this.user.location.coordinates.toList(),
                    //   }
                    // });

                    // print(this.user.id);
                    // print(this.user.email);
                    // print(this.user.birthdate);
                    // print(this.user.gender);
                    // print(this.user.firstName);
                    // print(this.user.lastName);
                    // print(this.user.profilePic);
                    // print(this.user.verified);
                    // print(this.user.notificationsEnabled);
                    // print(this.user.locationEnabled);
                    // print(this.user.postIds);
                    // print(this.user.tripIds);
                    // print(this.user.messageBoardIds);
                    // print(this.user.friendIds);
                    // print(this.user.location);

                    prefs.setString('user', json.encode(this.user));
                    Navigator.popUntil(context, ModalRoute.withName("/"));
                  } else {
                    showDialog(
                        context: context,
                        builder: (context) => buildStandardDialog(
                            context,
                            "Log in",
                            "A login attempt is already in progress. Please wait for it to finish before trying again."));
                  }
                },
              )
            ],
          )
        ])));
  }
}

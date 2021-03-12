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
                    userLogin(jsonEncode(
                        <String, dynamic>{'username': 'ff', 'password': 'f'}));
                    String id = await createUser();
                    UserModel fetchedUser = await getUser(id);

                    this.user.setAllFieldsFromUser(fetchedUser);
                    SharedPreferences prefs =
                        await SharedPreferences.getInstance();

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

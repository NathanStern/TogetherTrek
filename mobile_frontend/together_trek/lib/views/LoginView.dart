import 'package:flutter/material.dart';
import 'package:together_trek/models/LocationModel.dart';
import 'package:together_trek/models/ProfilePicModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/api/UserWrapper.dart';

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
                    print(id);
                    UserModel user = await getUser(id);
                    print(user.location.toString());
                    this.user.setAllFieldsFromUser(user);
                    Navigator.pop(context);
                  }
                },
              )
            ],
          )
        ])));
  }
}
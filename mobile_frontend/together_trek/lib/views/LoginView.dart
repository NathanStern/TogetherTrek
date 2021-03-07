import 'package:flutter/material.dart';

class LoginView extends StatefulWidget {
  _LoginViewState createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  bool _isSwitched = false;
  @override
  Widget build(BuildContext context) {
    // return Scaffold(
    //     appBar: AppBar(title: Text("Log In")),
    //     body: Container(child: Text("Hello")));
    return Scaffold(
        appBar: AppBar(title: Text("Log In")),
        body: Container(
            child: Column(
          children: [Text("Log in")],
        )));
  }
}

// this.user.setAllFields(
//                   "id",
//                   "username",
//                   "email",
//                   "birthdate",
//                   "gender",
//                   "firstName",
//                   "lastName",
//                   ProfilePicModel.empty(),
//                   true,
//                   true,
//                   true,
//                   [],
//                   [],
//                   [],
//                   [],
//                   LocationModel.empty());

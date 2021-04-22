import 'dart:convert';
import 'dart:math';
import 'package:sha3/sha3.dart';
import 'package:hex/hex.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/ProfileInfoView.dart';
import 'ProfileInfoView.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'ProfilePageView.dart';
import 'package:together_trek/api/UserWrapper.dart';

class ChangeSensInfoView extends StatefulWidget {
  ChangeSensInfoView({Key key, this.user}) : super(key: key);
  UserModel user;

  _ChangeSensInfoView createState() => _ChangeSensInfoView(user: user);
}

class _ChangeSensInfoView extends State<ChangeSensInfoView> {
  _ChangeSensInfoView({this.user});
  UserModel user;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Change Sensitive Information"),
      ),
      body: MyCustomForm(user: user),
    );
  }
}

class MyCustomForm extends StatefulWidget {
  MyCustomForm({Key key, this.user}) : super(key: key);
  UserModel user;
  @override
  MyCustomFormState createState() {
    return MyCustomFormState(user: user);
  }
}

class MyCustomFormState extends State<MyCustomForm> {
  MyCustomFormState({this.user});
  UserModel user;
  final _formKey = GlobalKey<FormState>();

  String _id;
  String _userName;
  String _email;
  /*String _gender;
  String _city;
  String _country;
  String _bio;*/
  String _password;
  String _newPassword;
  //String _newPassUnhashed;

  @override
  Widget build(BuildContext context) {
    if (user == null) {
      print("bad user");
    }

    _id = user.id;
    //_gender = user.gender;
    _userName = user.username;
    _email = "";
    /*_city = user.city;
    _country = user.country;*/
    _password = "";
    _newPassword = "";
    //_newPassUnhashed = "";

    return Form(
        key: _formKey,
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: <
            Widget>[
          Text(
            "Current Password",
            style: TextStyle(
              fontSize: 22.0,
              color: Colors.black,
            ),
          ),
          TextFormField(
            initialValue: "",
            decoration: InputDecoration(hintText: "Current password"),
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter your password';
              }
              return null;
            },
            onSaved: (value) {
              setState(() {
                SHA3 password = SHA3(256, SHA3_PADDING, 256);
                password.update(utf8.encode(value));
                List<int> hash = password.digest();
                _password = HEX.encode(hash);
              });
            },
          ),
          Text(
            "New Password",
            style: TextStyle(
              fontSize: 22.0,
              color: Colors.black,
            ),
          ),
          TextFormField(
            initialValue: "",
            decoration: InputDecoration(hintText: "New Password"),
            validator: (value) {
              /*if (value.isEmpty) {
                    return 'Please enter a password';
                  }*/
              return null;
            },
            onSaved: (value) {
              setState(() {
                SHA3 password = SHA3(256, SHA3_PADDING, 256);
                password.update(utf8.encode(value));
                List<int> hash = password.digest();
                _newPassword = HEX.encode(hash);
              });
            },
          ),
          Row(children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ElevatedButton(
                onPressed: () async {
                  if (_formKey.currentState.validate()) {
                    final form = _formKey.currentState;
                    form.save();
                    print("username = " + _userName);
                    print("password = " + _password);
                    print("newpassword = " + _newPassword);
                    if (_newPassword == null || _newPassword.length < 1) {
                      showDialog(
                          context: context,
                          builder: (context) => buildStandardDialog(
                              context, "Password Error", "Invalid Password."));
                    } else if (_password != user.password) {
                      showDialog(
                          context: context,
                          builder: (context) => buildStandardDialog(
                              context, "Login Error", "Incorrect Password."));
                      print("couldn't log in");
                      /*_passwordController.text = "";
                          _firstPressed = true;*/
                    } else {
                      await updateUser(
                        _id,
                        jsonEncode(<String, dynamic>{
                          "password": _newPassword,
                        }),
                      );
                      user.setPassword(_newPassword);
                      print("logged in");
                      showDialog(
                          context: context,
                          builder: (context) => buildStandardDialog(
                              context, "Success", "Password Updated."));
                      //Navigator.pop(context);
                    }
                    //user.setPassword(_userName);
                  }
                },
                child: Text('Confirm'),
              ),
            ),
          ]),
          Text(
            "New Email",
            style: TextStyle(
              fontSize: 22.0,
              color: Colors.black,
            ),
          ),
          TextFormField(
            initialValue: "",
            decoration: InputDecoration(hintText: "New Email"),
            validator: (value) {
              /*if (value.isEmpty) {
                return 'Please enter an Email';
              }*/
              return null;
            },
            onSaved: (value) {
              setState(() {
                _email = value;
              });
            },
          ),
          Row(children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ElevatedButton(
                onPressed: () async {
                  if (_formKey.currentState.validate()) {
                    final form = _formKey.currentState;
                    form.save();
                    if (_email == null || _email.length < 1) {
                      showDialog(
                          context: context,
                          builder: (context) => buildStandardDialog(
                              context, "Email Error", "Invalid Email."));
                    } else if (_password != user.password) {
                      showDialog(
                          context: context,
                          builder: (context) => buildStandardDialog(
                              context, "Login Error", "Incorrect Password."));
                      print("couldn't log in");
                      /*_passwordController.text = "";
                          _firstPressed = true;*/
                    } else {
                      await updateUser(
                        _id,
                        jsonEncode(<String, dynamic>{
                          "email": _email,
                        }),
                      );
                      user.setEmail(_email);
                      print("logged in");
                      showDialog(
                          context: context,
                          builder: (context) => buildStandardDialog(
                              context, "Success", "Email Updated."));
                      //Navigator.pop(context);
                    }
                    //user.setPassword(_userName);
                  }
                },
                child: Text('Confirm'),
              ),
            ),
          ]),
        ]));
  }
}

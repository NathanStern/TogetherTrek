import 'dart:convert';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/ProfileInfoView.dart';
import 'ProfileInfoView.dart';
import 'ProfilePageView.dart';
import 'package:together_trek/api/UserWrapper.dart';

class EditProfilePageView extends StatefulWidget {
  EditProfilePageView({Key key, this.user}) : super(key: key);
  UserModel user;

  _EditProfilePageView createState() => _EditProfilePageView(user: user);
}

class _EditProfilePageView extends State<EditProfilePageView> {
  _EditProfilePageView({this.user});
  UserModel user;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Edit Post"),
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
  String _destination;
  String _bio;

  @override
  Widget build(BuildContext context) {
    if (user == null) {
      print("bad user");
    }

    _id = user.id;
    _userName = user.username;
    _destination = user.location.toString();

    return Form(
        key: _formKey,
        child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              TextFormField(
                initialValue: _userName,
                decoration: InputDecoration(hintText: "UserName"),
                validator: (value) {
                  if (value.isEmpty) {
                    return 'Please enter a userName';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    _userName = value;
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
                        await updateUser(
                            _id,
                            jsonEncode(
                                <String, dynamic>{"username": _userName}));
                        user.setUsername(_userName);
                        Navigator.pop(context);
                        setState(() {});
                      }
                    },
                    child: Text('Confirm'),
                  ),
                ),
              ])
            ]));
  }
}

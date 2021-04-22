import 'dart:convert';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/ProfileInfoView.dart';
import 'package:together_trek/views/ChangeSensInfoView.dart';
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
        title: Text("Edit Profile"),
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
  String _gender;
  String _city;
  String _country;
  String _bio;

  @override
  Widget build(BuildContext context) {
    if (user == null) {
      print("bad user");
    }

    _id = user.id;
    _gender = user.gender;
    // _userName = user.username;
    _city = user.city;
    _country = user.country;

    return Form(
        key: _formKey,
        child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              // TextFormField(
              //   initialValue: _userName,
              //   decoration: InputDecoration(hintText: "UserName"),
              //   validator: (value) {
              //     if (value.isEmpty) {
              //       return 'Please enter a userName';
              //     }
              //     return null;
              //   },
              //   onSaved: (value) {
              //     setState(() {
              //       _userName = value;
              //     });
              //   },
              // ),
              DropdownButtonFormField(
                decoration: InputDecoration(
                    icon: Icon(Icons.person_outline), hintText: "Gender"),
                items: [
                  DropdownMenuItem(child: Text("Male"), value: "Male"),
                  DropdownMenuItem(
                    child: Text("Female"),
                    value: "Female",
                  ),
                  DropdownMenuItem(
                    child: Text("Non-binary"),
                    value: "Non-binary",
                  ),
                  DropdownMenuItem(
                    child: Text("Other"),
                    value: "Other",
                  )
                ],
                value: _gender,
                onChanged: (value) {
                  setState(() {
                    _gender = value;
                  });
                },
                validator: (value) {
                  if (value == null || value == "") {
                    return "Enter your gender";
                  } else {
                    return null;
                  }
                },
              ),
              TextFormField(
                initialValue: _city,
                decoration: InputDecoration(hintText: "City"),
                validator: (value) {
                  if (value.isEmpty) {
                    return 'Please enter a city';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    _city = value;
                  });
                },
              ),
              TextFormField(
                initialValue: _country,
                decoration: InputDecoration(hintText: "Country"),
                validator: (value) {
                  if (value.isEmpty) {
                    return 'Please enter a country';
                  }
                  return null;
                },
                onSaved: (value) {
                  setState(() {
                    _country = value;
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
                        // print(_city);
                        // UserModel editedUser = context.read<UserModel>();
                        // editedUser.setGender(_gender);
                        // editedUser.setCity(_city);
                        // editedUser.setCountry(_country);
                        String newCity = _city;
                        String newCountry = _country;
                        String newGender = _gender;
                        await updateUser(
                          _id,
                          jsonEncode(<String, dynamic>{
//<<<<<<< HEAD
                            //"username": _userName,
//=======
                            // "username": _userName,
//>>>>>>> main
                            "gender": _gender,
                            "city": _city,
                            "country": _country
                          }),
                        );
                        user.setGender(newGender);
                        user.setCity(newCity);
                        user.setCountry(newCountry);
                        // user.setUsername(_userName);
                        Navigator.pop(context);
                      }
                    },
                    child: Text('Confirm'),
                  ),
                ),
                /*Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: ElevatedButton(
                    onPressed: () async {},
                    child: Text('Change Sensitive Information Screen'),
                  ),
                ),*/
                Container(
                  width: 300.00,
                  child: RaisedButton(
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) =>
                                    ChangeSensInfoView(user: user)));
                      },
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(80.0)),
                      elevation: 1.0,
                      padding: EdgeInsets.all(0.0),
                      child: Ink(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                              begin: Alignment.centerRight,
                              end: Alignment.centerLeft,
                              colors: [Colors.redAccent, Colors.orangeAccent]),
                          borderRadius: BorderRadius.circular(30.0),
                        ),
                        child: Container(
                          constraints:
                              BoxConstraints(maxWidth: 300.0, minHeight: 50.0),
                          alignment: Alignment.center,
                          child: Text(
                            "Change Sensitive Information",
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 20.0,
                                fontWeight: FontWeight.w300),
                          ),
                        ),
                      )),
                ),
              ])
            ]));
  }
}

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:together_trek/models/LocationModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/api/UserWrapper.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:hex/hex.dart';
import 'package:sha3/sha3.dart';

class RegistrationView extends StatefulWidget {
  RegistrationView({Key key, this.user}) : super(key: key);

  UserModel user;
  _RegistrationViewState createState() => _RegistrationViewState();
}

class _RegistrationViewState extends State<RegistrationView> {
  UserModel user;

  final _formKey = GlobalKey<FormState>();

  final FocusNode _usernameFocus = new FocusNode();
  final FocusNode _passwordFocus = new FocusNode();
  final FocusNode _passwordConfirmFocus = new FocusNode();
  final FocusNode _emailFocus = new FocusNode();
  final FocusNode _birthdateFocus = new FocusNode();
  final FocusNode _genderFocus = new FocusNode();
  final FocusNode _firstNameFocus = new FocusNode();
  final FocusNode _lastNameFocus = new FocusNode();

  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  final _passwordConfirmController = TextEditingController();
  final _emailController = TextEditingController();
  final _birthdateController = TextEditingController();
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    _passwordConfirmController.dispose();
    _usernameFocus.dispose();
    _passwordFocus.dispose();
    _passwordConfirmFocus.dispose();
    super.dispose();
  }

  bool _firstPressed = true;

  Future<void> _register() async {
    if (_firstPressed) {
      _firstPressed = false;
      if (_formKey.currentState.validate()) {
        // FocusScopeNode currentNode = FocusScope.of(context);

        // if (!currentNode.hasPrimaryFocus) {
        //   currentNode.unfocus();
        // }

        SHA3 test = SHA3(256, SHA3_PADDING, 256);
        test.update(utf8.encode(_passwordController.text));
        List<int> hash = test.digest();

        int response = await createUser(jsonEncode(<String, dynamic>{
          'username': _usernameController.text,
          'password': HEX.encode(hash),
          'email': _emailController.text,
          'birthdate': _date.toString(),
          'gender': _gender,
          'first_name': _firstNameController.text,
          'last_name': _lastNameController.text,
          'friend_ids': [],
          'post_ids': [],
          'trip_ids': [],
          'message_board_ids': [],
          'location': LocationModel.empty()
        }));

        if (response != 200) {
          _firstPressed = true;
          showDialog(
              context: context,
              builder: (context) => buildStandardDialog(
                  context,
                  "Registration Error",
                  "An error occurred when trying to create a user."));
        } else {
          Navigator.of(context).pop();
        }
      }
    }
  }

  DateTime _date;
  String _gender;

  @override
  Widget build(BuildContext context) {
    user = context.read<UserModel>();
    return GestureDetector(
        onTap: () {
          FocusScopeNode currentNode = FocusScope.of(context);

          if (!currentNode.hasPrimaryFocus) {
            currentNode.unfocus();
          }
        },
        child: Scaffold(
            appBar: AppBar(
              title: Text("Register"),
            ),
            body: Form(
              key: _formKey,
              child: SingleChildScrollView(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  //crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Card(
                      elevation: 3,
                      child: Container(
                          padding: EdgeInsets.all(10),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Image(
                                  image: ResizeImage(
                                      AssetImage('lib/resources/logo.jpg'),
                                      allowUpscaling: true,
                                      height:
                                          (MediaQuery.of(context).size.height ~/
                                              2)),
                                  width:
                                      (MediaQuery.of(context).size.width / 1)),
                              TextFormField(
                                decoration: InputDecoration(
                                  icon: Icon(Icons.person_outline_rounded),
                                  hintText: "Username",
                                ),
                                controller: _usernameController,
                                autofocus: false,
                                focusNode: _usernameFocus,
                                keyboardType: TextInputType.name,
                                autocorrect: false,
                                autofillHints: [AutofillHints.username],
                                textInputAction: TextInputAction.next,
                                onFieldSubmitted: (val) {
                                  _fieldFocusChange(
                                      context, _usernameFocus, _passwordFocus);
                                },
                                validator: (value) {
                                  if (value.isEmpty) {
                                    return "Please enter your username";
                                  }
                                  return null;
                                },
                              ),
                              TextFormField(
                                decoration: InputDecoration(
                                  icon: Icon(Icons.lock_outline_rounded),
                                  hintText: "Password",
                                ),
                                controller: _passwordController,
                                autocorrect: false,
                                obscureText: true,
                                focusNode: _passwordFocus,
                                keyboardType: TextInputType.text,
                                textInputAction: TextInputAction.next,
                                autofillHints: [AutofillHints.password],
                                onFieldSubmitted: (val) {
                                  _fieldFocusChange(context, _passwordFocus,
                                      _passwordConfirmFocus);
                                },
                                validator: (value) {
                                  if (value.isEmpty) {
                                    return "Please enter your password";
                                  } else {
                                    return null;
                                  }
                                },
                              ),
                              TextFormField(
                                decoration: InputDecoration(
                                    hintText: "Confirm Password",
                                    icon: Icon(Icons.lock_outline_rounded)),
                                controller: _passwordConfirmController,
                                autocorrect: false,
                                obscureText: true,
                                focusNode: _passwordConfirmFocus,
                                keyboardType: TextInputType.text,
                                textInputAction: TextInputAction.next,
                                autofillHints: [AutofillHints.password],
                                onFieldSubmitted: (val) {
                                  _fieldFocusChange(context,
                                      _passwordConfirmFocus, _emailFocus);
                                },
                                validator: (value) {
                                  if (value.isEmpty) {
                                    return "Please enter your password again";
                                  } else if (value !=
                                      _passwordController.text) {
                                    return "Passwords do not match";
                                  } else {
                                    return null;
                                  }
                                },
                              ),
                              TextFormField(
                                decoration: InputDecoration(
                                    hintText: "Email Address",
                                    icon: Icon(Icons.email_outlined)),
                                controller: _emailController,
                                autocorrect: false,
                                focusNode: _emailFocus,
                                keyboardType: TextInputType.text,
                                textInputAction: TextInputAction.next,
                                autofillHints: [AutofillHints.password],
                                onFieldSubmitted: (val) {
                                  _fieldFocusChange(
                                      context, _emailFocus, _birthdateFocus);
                                },
                                validator: (value) {
                                  if (value.isEmpty) {
                                    return "Please enter your email address";
                                  } else {
                                    return null;
                                  }
                                },
                              ),
                              TextFormField(
                                decoration: InputDecoration(
                                    hintText: "Date of Birth",
                                    icon: Icon(Icons.calendar_today_outlined)),
                                controller: _birthdateController,
                                onTap: () async {
                                  DateTime picker = await showDatePicker(
                                      context: context,
                                      initialDate: DateTime.now(),
                                      firstDate: DateTime(1900),
                                      lastDate: DateTime.now(),
                                      helpText: "Date of Birth");

                                  //_birthdateController.text = picker.toString();
                                  if (picker != null) {
                                    this._date = picker;
                                  }
                                  setState(() {
                                    if (this._date != null) {
                                      _birthdateController.text =
                                          "${this._date.month}/${this._date.day}/${this._date.year}";
                                      FocusScopeNode currentNode =
                                          FocusScope.of(context);

                                      if (!currentNode.hasPrimaryFocus) {
                                        currentNode.unfocus();
                                      }
                                      _fieldFocusChange(context,
                                          _birthdateFocus, _genderFocus);
                                    } else {
                                      _birthdateController.text = "";
                                    }
                                  });
                                },
                                readOnly: true,
                                textInputAction: TextInputAction.next,
                                onFieldSubmitted: (val) {},
                                validator: (value) {
                                  if (value.isEmpty) {
                                    return "Please enter your date of birth";
                                  } else {
                                    return null;
                                  }
                                },
                              ),
                              DropdownButtonFormField(
                                decoration: InputDecoration(
                                    icon: Icon(Icons.person_outline),
                                    hintText: "Gender"),
                                focusNode: _genderFocus,
                                //hint: Text("Gender"),
                                items: [
                                  DropdownMenuItem(
                                      child: Text("Male"), value: "Male"),
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
                                onChanged: (val) {
                                  setState(() {
                                    _gender = val;
                                    _fieldFocusChange(
                                        context,
                                        FocusScope.of(context),
                                        _firstNameFocus);
                                  });
                                },
                                validator: (val) {
                                  if (val == null || val == "") {
                                    return "Enter your gender";
                                  } else {
                                    return null;
                                  }
                                },
                              ),
                              TextFormField(
                                decoration: InputDecoration(
                                    hintText: "First Name",
                                    icon: Icon(Icons.person_outline)),
                                controller: _firstNameController,
                                autocorrect: false,
                                focusNode: _firstNameFocus,
                                keyboardType: TextInputType.text,
                                textInputAction: TextInputAction.next,
                                autofillHints: [AutofillHints.password],
                                onFieldSubmitted: (val) {
                                  _fieldFocusChange(
                                      context, _firstNameFocus, _lastNameFocus);
                                },
                                validator: (value) {
                                  if (value.isEmpty) {
                                    return "Please enter your password again";
                                  } else {
                                    return null;
                                  }
                                },
                              ),
                              TextFormField(
                                decoration: InputDecoration(
                                    hintText: "Last Name",
                                    icon: Icon(Icons.person_outline)),
                                controller: _lastNameController,
                                autocorrect: false,
                                focusNode: _lastNameFocus,
                                keyboardType: TextInputType.text,
                                textInputAction: TextInputAction.go,
                                autofillHints: [AutofillHints.password],
                                onFieldSubmitted: (val) async {
                                  // _fieldFocusChange(context, _passwordFocus,
                                  //     _passwordConfirmFocus);
                                  FocusScope.of(context).unfocus();
                                  _formKey.currentState.validate();
                                  await _register();
                                },
                                validator: (value) {
                                  if (value.isEmpty) {
                                    return "Please enter your password again";
                                  } else {
                                    return null;
                                  }
                                },
                              ),
                              ElevatedButton(
                                onPressed: () async {
                                  _formKey.currentState.validate();
                                  await _register().timeout(
                                      Duration(seconds: 10), onTimeout: () {
                                    showDialog(
                                        context: context,
                                        builder: (context) {
                                          return buildStandardDialog(
                                              context,
                                              "Network Error",
                                              "There was an error contacting the server.");
                                        });
                                  }).catchError((err) {
                                    showDialog(
                                        context: context,
                                        builder: (context) {
                                          return buildStandardDialog(context,
                                              "Network Error", err.toString());
                                        });
                                  });
                                },
                                child: Text("Submit"),
                              ),
                            ],
                          )),
                    )
                  ],
                ),
              ),
            )));
  }

  void _fieldFocusChange(
      BuildContext context, FocusNode currentFocus, FocusNode nextFocus) {
    currentFocus.unfocus();
    FocusScope.of(context).requestFocus(nextFocus);
  }
}

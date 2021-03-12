import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/api/UserWrapper.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/utils/DialogUtil.dart';

class LoginView extends StatefulWidget {
  LoginView({Key key, this.user}) : super(key: key);

  UserModel user;
  _LoginViewState createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  UserModel user;

  final _formKey = GlobalKey<FormState>();

  final FocusNode _usernameFocus = new FocusNode();
  final FocusNode _passwordFocus = new FocusNode();

  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    _usernameFocus.dispose();
    _passwordFocus.dispose();
    super.dispose();
  }

  bool _firstPressed = true;

  Future<void> _login() async {
    if (_firstPressed) {
      _firstPressed = false;
      if (_formKey.currentState.validate()) {
        FocusScopeNode currentNode = FocusScope.of(context);

        if (!currentNode.hasPrimaryFocus) {
          currentNode.unfocus();
        }

        // print(_usernameController.text);
        // print(_passwordController.text);

        int response = await userLogin(jsonEncode(<String, dynamic>{
          'username': '${_usernameController.text}',
          'password': '${_passwordController.text}'
        }));

        if (response != 200) {
          showDialog(
              context: context,
              builder: (context) => buildStandardDialog(
                  context, "Login Error", "Incorrect Username or Password."));
          _passwordController.text = "";
          _firstPressed = true;
        } else {
          SharedPreferences prefs = await SharedPreferences.getInstance();

          String jwt = prefs.getString('jwt');

          UserModel fetchedUser = await getUser(JwtDecoder.decode(jwt)['id']);

          user.setAllFieldsFromUser(fetchedUser);

          prefs.setString('user', json.encode(this.user));
          Navigator.popUntil(context, ModalRoute.withName("/"));
        }
      }
    }
  }

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
              title: Text("Log In"),
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
                                autofocus: true,
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
                                textInputAction: TextInputAction.go,
                                autofillHints: [AutofillHints.password],
                                onFieldSubmitted: (val) async {
                                  await _login();
                                },
                                validator: (value) {
                                  if (value.isEmpty) {
                                    return "Please enter your password";
                                  } else {
                                    return null;
                                  }
                                },
                              ),
                              ElevatedButton(
                                onPressed: () async {
                                  await _login();
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

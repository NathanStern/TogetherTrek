import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:hex/hex.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:sha3/sha3.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/api/PostWrapper.dart';
import 'package:together_trek/api/TripWrapper.dart';
import 'package:together_trek/models/LoadedPostsModel.dart';
import 'package:together_trek/models/LoadedTripsModel.dart';

import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/api/UserWrapper.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:together_trek/views/RegistrationView.dart';

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

        SHA3 password = SHA3(256, SHA3_PADDING, 256);
        password.update(utf8.encode(_passwordController.text));
        List<int> hash = password.digest();

        int response = await userLogin(jsonEncode(<String, dynamic>{
          'username': '${_usernameController.text}',
          'password': '${HEX.encode(hash)}'
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

          prefs.setString('user', this.user.id);

          LoadedTripsModel trips = context.read<LoadedTripsModel>();
          LoadedPostsModel posts = context.read<LoadedPostsModel>();

          user.tripIds = await getTripsById(trips.trips, user.id);
          user.postIds = await getPostsById(posts.posts, user.id);

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
                                autofocus: false,
                                focusNode: _usernameFocus,
                                keyboardType: TextInputType.text,
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
                                  await _login().timeout(Duration(seconds: 15),
                                      onTimeout: () {
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
                                  await _login().timeout(Duration(seconds: 15),
                                      onTimeout: () {
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
                              Text("Don't have an account?"),
                              TextButton(
                                child: Text("Register"),
                                onPressed: () {
                                  Navigator.of(context).push(MaterialPageRoute(
                                      builder: (context) =>
                                          RegistrationView()));
                                },
                              )
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

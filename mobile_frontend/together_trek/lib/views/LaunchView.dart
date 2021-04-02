import 'dart:convert';
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

import 'package:together_trek/api/PostWrapper.dart';
import 'package:together_trek/api/TripWrapper.dart';
import 'package:together_trek/api/UserWrapper.dart';
import 'package:together_trek/models/LoadedPostsModel.dart';
import 'package:together_trek/models/LoadedTripsModel.dart';
import 'package:together_trek/models/TokenModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/utils/DialogUtil.dart';

class LaunchView extends StatefulWidget {
  _LaunchViewState createState() => _LaunchViewState();
}

class _LaunchViewState extends State<LaunchView> {
  void _loadPosts(BuildContext context) async {
    LoadedPostsModel posts = context.read<LoadedPostsModel>();
    // posts.resetPosts(List.from((await getPosts()).reversed));
    posts.resetPosts(await getPosts());
  }

  void _loadTrips(BuildContext context) async {
    LoadedTripsModel trips = context.read<LoadedTripsModel>();
    trips.resetTrips(await getTrips());
  }

  Future<void> _getUserData(BuildContext context) async {
    UserModel user = context.read<UserModel>();
    SharedPreferences _prefs = await SharedPreferences.getInstance();

    String userString = _prefs.getString('user');

    if (userString == null) {
      await _prefs.setString('user', user.id);
      userString = _prefs.getString('user');
    }

    // UserModel readUser = UserModel.fromJson(jsonDecode(userString));

    // user.setAllFieldsFromUser(readUser);

    if (userString != "") {
      UserModel serverUser = await getUser(userString);

      user.setAllFieldsFromUser(serverUser);

      await _prefs.setString('user', user.id);
    }
  }

  Future<void> _getJWT(BuildContext context) async {
    TokenModel token = context.read<TokenModel>();
    SharedPreferences _prefs = await SharedPreferences.getInstance();

    String readToken = _prefs.getString('jwt');

    token.setFields(readToken);
  }

  void _refreshNetwork() {
    setState(() {});
  }

  void _checkToken() async {
    TokenModel token = context.read<TokenModel>();
    UserModel user = context.read<UserModel>();
    SharedPreferences _prefs = await SharedPreferences.getInstance();

    if (token == null) {
      _prefs.setString('user', "");
      _prefs.setString('jwt', "");
      user.setAllFieldsFromUser(UserModel.empty());
      return;
    }

    try {
      if (JwtDecoder.isExpired(token.token)) {
        _prefs.setString('user', "");
        _prefs.setString('jwt', "");
        user.setAllFieldsFromUser(UserModel.empty());
      }
    } catch (err) {
      if (err is FormatException) {
        _prefs.setString('user', "");
        _prefs.setString('jwt', "");
        user.setAllFieldsFromUser(UserModel.empty());
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    Future.delayed(Duration(seconds: 1), () async {
      // await _loadPosts(context, posts);
      await _getUserData(context);
      await _getJWT(context);
      await _loadPosts(context);
      await _loadTrips(context);
      await _checkToken();
      Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
    }).timeout(Duration(seconds: 15), onTimeout: () {
      showDialog(
          context: context,
          builder: (context) {
            return buildActionDialog(
                context,
                "Network Error",
                "The request to load application data timed out.",
                _refreshNetwork);
          });
    }).catchError((err) {
      showDialog(
          context: context,
          builder: (context) {
            return buildActionDialog(
                context,
                "Network Error",
                "${err.toString()} A network error occurred. You might not be connected to the internet.",
                _refreshNetwork);
          });
    });
    return Scaffold(
        backgroundColor: Colors.white,
        body: Container(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Row(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image(
                      image: ResizeImage(AssetImage('lib/resources/logo.jpg'),
                          allowUpscaling: true,
                          height: (MediaQuery.of(context).size.height ~/ 2)),
                      width: (MediaQuery.of(context).size.width / 1)),
                ],
              ),
            ],
          ),
        ));
  }
}

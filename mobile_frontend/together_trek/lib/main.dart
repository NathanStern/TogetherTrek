import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/HomeView.dart';
import 'package:flutter/material.dart';
import 'package:together_trek/views/LaunchView.dart';

void main() async {
  runApp(ChangeNotifierProvider(
      create: (context) => UserModel.empty(), child: MyApp()));
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  SystemChrome.setEnabledSystemUIOverlays(
      [SystemUiOverlay.top, SystemUiOverlay.bottom]);
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.

  Future<void> _getUserData(BuildContext context) async {
    UserModel user = context.read<UserModel>();
    SharedPreferences _prefs = await SharedPreferences.getInstance();

    String userString = _prefs.getString('user');

    if (userString == null) {
      await _prefs.setString('user', jsonEncode(user));
      userString = _prefs.getString('user');
    }

    UserModel readUser = UserModel.fromJson(jsonDecode(userString));

    user.setAllFieldsFromUser(readUser);

    user.setAllFieldsFromUser(user);
    //print("all fields set");
  }

  @override
  Widget build(BuildContext context) {
    _getUserData(context);
    return MaterialApp(
        title: 'TogetherTrek',
        theme: ThemeData(
          // This is the theme of your application.
          //
          // Try running your application with "flutter run". You'll see the
          // application has a blue toolbar. Then, without quitting the app, try
          // changing the primarySwatch below to Colors.green and then invoke
          // "hot reload" (press "r" in the console where you ran "flutter run",
          // or simply save your changes to "hot reload" in a Flutter IDE).
          // Notice that the counter didn't reset back to zero; the application
          // is not restarted.
          primarySwatch: Colors.deepOrange,
          // This makes the visual density adapt to the platform that you run
          // the app on. For desktop platforms, the controls will be smaller and
          // closer together (more dense) than on mobile platforms.
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        // home: MyHomePage(title: 'TogetherTrek'),
        //home: HomeView(),
        debugShowCheckedModeBanner: false,
        initialRoute: '/launch',
        routes: {
          '/launch': (context) => LaunchView(),
          '/': (context) => HomeView(),
        });
  }
}

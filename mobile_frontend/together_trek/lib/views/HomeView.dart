import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:package_info/package_info.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:together_trek/views/HomeDrawerView.dart';
import 'package:together_trek/views/MessagesView.dart';
import 'package:together_trek/views/PlaceholderView.dart';
import 'package:together_trek/views/PostsView.dart';
import 'package:together_trek/views/ProfilePage.dart';
import 'package:provider/provider.dart';

class HomeView extends StatefulWidget {
  _HomeViewState createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  int _selectedIndex = 1;
  int _counter = 0;

  Future<PackageInfo> packageInfo = PackageInfo.fromPlatform();
  Future<SharedPreferences> _prefs = SharedPreferences.getInstance();

  static List<Widget> _widgetOptions = <Widget>[
    MessagesView(),
    PostsView(),
    ProfilePage()
  ];

  void _onTappedItem(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  Widget _actionButton(int index) {
    if (_selectedIndex == 1) {
      return Container(
          height: 60,
          width: 60,
          child: FittedBox(
              child: FloatingActionButton(
                  tooltip: "Create Post",
                  onPressed: () {
                    showDialog(
                        context: context,
                        builder: (context) => buildStandardDialog(
                            context,
                            "Create Post",
                            "This function has not been implemented yet. This is just a test dialog."));
                  },
                  child: Icon(Icons.add))));
    } else if (_selectedIndex == 0) {
      return Container(
          height: 60,
          width: 60,
          child: FittedBox(
              child: FloatingActionButton(
                  tooltip: "New Message",
                  onPressed: () {
                    showDialog(
                        context: context,
                        builder: (context) => buildStandardDialog(
                            context,
                            "New Message",
                            "This function has not been implemented yet. This is just a test dialog."));
                  },
                  child: Icon(Icons.add))));
    } else {
      return null;
    }
  }

  UserModel user;

  Future<UserModel> _getUserData() async {
    user = context.read<UserModel>();
    SharedPreferences _prefs = await SharedPreferences.getInstance();

    String userString = _prefs.getString('user');
    //print(userString);

    if (userString == null || userString == "") {
      await _prefs.setString('user', jsonEncode(user));
      userString = _prefs.getString('user');
    }

    UserModel readUser = UserModel.fromJson(jsonDecode(userString));

    user.setAllFieldsFromUser(readUser);

    await Future.delayed(Duration(milliseconds: 1500), () {});
    user.setAllFieldsFromUser(user);
    return user;
  }

  Future<UserModel> readUser;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("TogetherTrek"),
        ),
        body: _widgetOptions.elementAt(_selectedIndex),
        bottomNavigationBar: BottomNavigationBar(
          items: [
            BottomNavigationBarItem(
                icon: Icon(Icons.message_outlined), label: "Messages"),
            BottomNavigationBarItem(
                icon: Icon(Icons.home_outlined), label: "Home"),
            BottomNavigationBarItem(
                icon: Icon(Icons.person_outline), label: "Profile")
          ],
          currentIndex: _selectedIndex,
          onTap: _onTappedItem,
        ),
        floatingActionButton: _actionButton(_selectedIndex),
        drawer: createDrawer(context, user, _onTappedItem, packageInfo));
  }
}

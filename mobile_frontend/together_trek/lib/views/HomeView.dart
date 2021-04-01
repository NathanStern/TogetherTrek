import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:package_info/package_info.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:together_trek/api/PostWrapper.dart';
import 'package:together_trek/api/httpRequest.dart';
import 'package:together_trek/models/DestinationModel.dart';
import 'package:together_trek/models/PostModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:together_trek/views/HomeDrawerView.dart';
import 'package:together_trek/views/MakePostView.dart';
import 'package:together_trek/views/MakeTripView.dart';
import 'package:together_trek/views/MessagesView.dart';
import 'package:together_trek/views/TripsView.dart';
import 'package:together_trek/views/PlaceholderView.dart';
import 'package:together_trek/views/PostsView.dart';
import 'package:together_trek/views/ProfilePage.dart';
import 'package:together_trek/views/NotificationView.dart';
import 'package:provider/provider.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';

class HomeView extends StatefulWidget {
  _HomeViewState createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  int _selectedIndex = 2;

  Future<PackageInfo> packageInfo = PackageInfo.fromPlatform();
  Future<SharedPreferences> _prefs = SharedPreferences.getInstance();

  static List<Widget> _widgetOptions = <Widget>[
    MessagesView(),
    TripsView(),
    PostsView(),
    ProfilePage(),
    NotificationView(),
  ];

  void _onTappedItem(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  Widget _actionButton(int index) {
    if (_selectedIndex == 2) {
      return SpeedDial(
                //animatedIcon: AnimatedIcons.menu_close,
                //animatedIconTheme: IconThemeData(size: 30.0),
                icon: Icons.add,
                activeIcon: Icons.close,
                backgroundColor: Colors.deepOrange,
                buttonSize: 56,
                activeBackgroundColor: Colors.deepOrangeAccent,
                tooltip: "Create",
                visible: true,
                curve: Curves.bounceInOut,
                children: [
                  SpeedDialChild(
                    child: Icon(Icons.add),
                    backgroundColor: Colors.grey,
                    onTap: () {
                      Navigator.push(context, MaterialPageRoute(builder: (context) => MakePostView()));
                    },
                    label: 'Add Post',
                  ),
                  SpeedDialChild(
                    child: Icon(Icons.add),
                    
                    backgroundColor: Colors.grey,
                    onTap: () {
                      Navigator.push(context, MaterialPageRoute(builder: (context) => MakeTripView()));
                    },
                    label: 'Add Trip',
                  ),
                  ],
            
                );
    } else if (_selectedIndex == 0) {
      return Container(
          height: 56,
          width: 56,
          child: FittedBox(
              child: FloatingActionButton(
                  tooltip: "New Message",
                  onPressed: () {
                    // showDialog(
                    //     context: context,
                    //     builder: (context) => buildStandardDialog(
                    //         context,
                    //         "New Message",
                    //         "This function has not been implemented yet. This is just a test dialog."));
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => PlaceholderView(
                                  title: "New Message",
                                )));
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
          //backgroundColor: Colors.orange,//this will not change background color
          showUnselectedLabels: true,
          type: BottomNavigationBarType.fixed,
          items: <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.message),
              label: 'Messages',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.airplanemode_active_rounded),
              label: 'Trips',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              label: 'Profile',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.add_alert_rounded),
              label: 'Notification',
            ),
          ],
          currentIndex: _selectedIndex,
          onTap: _onTappedItem,
        ),
        floatingActionButton: _actionButton(_selectedIndex),
        drawer: createDrawer(context, user, _onTappedItem, packageInfo));
  }
}
